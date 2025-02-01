from flask_sqlalchemy import SQLAlchemy
from urllib.parse import quote

db = SQLAlchemy()

def init_db(app):
    password = quote("Dipanjan@29")
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://root:{password}@localhost:3306/proj_india'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
