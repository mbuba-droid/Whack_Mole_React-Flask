import os
from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from models import db
from routes import bp
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


CORS(app, origins=["http://localhost:5173"])

db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(bp)

if __name__ == "__main__":
    app.run(debug=True)
