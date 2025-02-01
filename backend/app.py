from flask import Flask, request, jsonify
from flask_cors import CORS
from lru_cache import LRUCache
from model import India
from config import db, init_db
from time import time, perf_counter

app = Flask(__name__)
CORS(app)
init_db(app)

cache = None 
key_counter = 0 

search_history = []

@app.route('/set_capacity', methods=['POST'])
def set_capacity():
    global cache
    data = request.get_json()
    capacity = data.get('capacity', 0)
    if capacity <= 0:
        return jsonify({'error': 'Capacity must be a positive integer'}), 400
    cache = LRUCache(capacity=capacity)
    return jsonify({'message': f'Cache capacity set to {capacity}'})

@app.route('/search', methods=['POST'])
def search_or_insert():
    global key_counter
    if cache is None:
        return jsonify({'error': 'Cache capacity not set'}), 400
    data = request.get_json()
    value = data.get('value')
    if value is None:
        return jsonify({'error': 'Value is required'}), 400
    
    # Start time for cache traversal
    start_time = perf_counter()
    
    # Check the cache first
    for key, val in cache.items():
        if val['state_ut'] == value:
            end_time = perf_counter()
            response_time = (end_time - start_time) * 1000  # Convert to milliseconds
            node = cache.cache.get_item(key)
            cache.dll.remove(node)
            cache.dll.append(node)
            log_search(value, response_time)
            return jsonify({'message': 'Value found and repositioned', 'key': key, 'value': val, 'response_time': response_time})
    
    # If not found in cache, check the database
    db_start_time = perf_counter()
    state = India.query.filter_by(state_ut=value).first()
    db_end_time = perf_counter()
    
    if state:
        key = key_counter
        key_counter += 1
        cache.put(key, state.to_dict())  # Cache the full state details
        
        # Check the cache again to simulate the process
        cache_check_start_time = perf_counter()
        for key, val in cache.items():
            if val['state_ut'] == value:
                cache_check_end_time = perf_counter()
                response_time = (cache_check_end_time - start_time) * 1000  # Convert to milliseconds
                log_search(value, response_time)
                return jsonify({'message': 'Value found in database and inserted into cache', 'key': key, 'value': state.to_dict(), 'response_time': response_time})
    
    end_time = perf_counter()
    response_time = (end_time - start_time) * 1000  # Convert to milliseconds
    log_search(value, response_time)
    return jsonify({'error': 'Value not found in cache or database', 'response_time': response_time}), 404

def log_search(state_ut, response_time):
    search_history.append({'state_ut': state_ut, 'response_time': response_time})

@app.route('/search_history', methods=['GET'])
def get_search_history():
    return jsonify(search_history)

@app.route('/state_details/<state_ut>', methods=['GET'])
def state_details(state_ut):
    if cache is None:
        return jsonify({'error': 'Cache capacity not set'}), 400
    for key, val in cache.items():
        if val['state_ut'] == state_ut:
            return jsonify({'value': val})
    
    return jsonify({'error': 'State not found in cache'}), 404

@app.route('/get_cache_contents', methods=['GET'])
def get_cache_contents():
    if cache is None:
        return jsonify({'error': 'Cache capacity not set'}), 400
    contents = []
    node = cache.dll.head.next
    while node != cache.dll.tail:
        contents.append({'key': node.key, 'state_ut': node.value['state_ut']})
        node = node.next
    return jsonify(contents)

@app.route('/reset', methods=['POST'])
def reset():
    global cache, key_counter, search_history
    cache = None
    key_counter = 0
    search_history = []
    return jsonify({'message': 'Cache and search history reset'})

@app.route('/all_states',methods=['GET'])
def get_all_states():
    try:
        return India.state_ut_all()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)