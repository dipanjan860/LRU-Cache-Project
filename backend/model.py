from config import db
from sqlalchemy import func
from flask import jsonify

class India(db.Model):
    __tablename__ = 'india'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    state_ut = db.Column(db.String(50), nullable=True)
    capital = db.Column(db.String(50), nullable=True)
    population = db.Column(db.Integer, nullable=True)
    description = db.Column(db.Text, nullable=True)
    famous_food = db.Column(db.String(255), nullable=True)
    famous_dance = db.Column(db.String(50), nullable=True)
    famous_places_to_visit = db.Column(db.String(255), nullable=True)
    language_spoken = db.Column(db.String(255), nullable=True)
    image_url = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'state_ut': self.state_ut,
            'capital': self.capital,
            'population': self.population,
            'description': self.description,
            'famous_food': self.famous_food,
            'famous_dance': self.famous_dance,
            'famous_places_to_visit': self.famous_places_to_visit,
            'language_spoken': self.language_spoken,
            'image_url': self.image_url
        }

    @staticmethod
    def get_state_details(state_ut):
        state = db.session.query(India).filter_by(state_ut=state_ut).first()
        if state:
            return jsonify(state.to_dict())
        else:
            return jsonify({'error': 'State not found'})

    @staticmethod
    def get_all_states():
        states = db.session.query(India).all()
        result = []
        for state in states:
            result.append(state.to_dict())
        return jsonify(result)
    
    @staticmethod
    def state_ut_all():
        rec=db.session.query(India).all()
        res=[]
        for r in rec:
            res.append(r.state_ut) 

        return jsonify(res)

    
    