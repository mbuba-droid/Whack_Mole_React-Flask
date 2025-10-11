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
CORS(app, resources={r"/*": {"origins": "*"}})

db.init_app(app)
with app.app_context():
    db.create_all()
migrate = Migrate(app, db)

app.register_blueprint(bp)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=False)
