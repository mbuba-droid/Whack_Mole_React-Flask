from flask import Blueprint, request, jsonify
from models import User
from db import db
from sqlalchemy.exc import IntegrityError
import uuid

bp = Blueprint("api", __name__)

@bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        if not data or not all(k in data for k in ("name", "email", "password")):
            return jsonify({"error": "Missing required fields"}), 400
        
        user = User(
            id=str(uuid.uuid4()),
            name=data["name"],
            email=data["email"],
            password=data["password"]
        )
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Email already exists"}), 400
    except Exception as e:
        db.session.rollback()

@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(name=data["name"], password=data["password"]).first()
    if user:
        return jsonify(user.to_dict())
    return jsonify({"error": "Invalid credentials"}), 401

@bp.route("/update-score/<user_id>", methods=["PUT"])
def update_score(user_id):
    data = request.get_json()
    user = User.query.get(user_id)
    if user:
        user.highscore = data["highscore"]
        db.session.commit()
        return jsonify(user.to_dict())
    return jsonify({"error": "User not found"}), 404

@bp.route("/delete-user/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted"})
    return jsonify({"error": "User not found"}), 404
