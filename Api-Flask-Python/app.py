from flask import Flask, request, jsonify
from flask_restful import Api
from models import db, Teste, Pet  
from resources import TesteResource, PetResource

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
api = Api(app)
db.init_app(app)

@app.route('/Testes', methods=['GET'])
def list_Testes():
    Testes = Teste.query.all()
    Testes_data = [{"id": Teste.id, "nome": Teste.nome} for Teste in Testes]
    return jsonify(Testes_data), 200

@app.route('/add_Teste', methods=['POST'])
def add_Teste():
    data = request.get_json()
    nome = data.get('nome')

    Teste = Teste(nome=nome)
    db.session.add(Teste)
    db.session.commit()
    
    return jsonify({"message": "Teste added successfully"}), 201

@app.route('/edit_Teste/<int:Teste_id>', methods=['PUT'])
def edit_Teste(Teste_id):
    Teste = Teste.query.get(Teste_id)
    if Teste is None:
        return jsonify({"message": "Teste not found"}), 404
    
    data = request.get_json()
    Teste.nome = data.get('nome')
    db.session.commit()
    
    return jsonify({"message": "Teste updated successfully"}), 200

@app.route('/delete_Teste/<int:Teste_id>', methods=['DELETE'])
def delete_Teste(Teste_id):
    Teste = Teste.query.get(Teste_id)
    if Teste is None:
        return jsonify({"message": "Teste not found"}), 404
    
    db.session.delete(Teste)
    db.session.commit()
    
    return jsonify({"message": "Teste deleted successfully"}), 204

@app.route('/pets', methods=['GET'])
def list_pets():
    pets = Pet.query.all()
    pets_data = [{"id": pet.id, "nome": pet.nome, "Teste_id": pet.Teste_id} for pet in pets]
    return jsonify(pets_data), 200

@app.route('/add_pet', methods=['POST'])
def add_pet():
    data = request.get_json()
    nome = data.get('nome')
    Teste_id = data.get('Teste_id')

    pet = Pet(nome=nome, Teste_id=Teste_id)
    db.session.add(pet)
    db.session.commit()
    
    return jsonify({"message": "Pet added successfully"}), 201

@app.route('/edit_pet/<int:pet_id>', methods=['PUT'])
def edit_pet(pet_id):
    pet = Pet.query.get(pet_id)
    if pet is None:
        return jsonify({"message": "Pet not found"}), 404
    
    data = request.get_json()
    pet.nome = data.get('nome')
    pet.Teste_id = data.get('Teste_id')
    db.session.commit()
    
    return jsonify({"message": "Pet updated successfully"}), 200

@app.route('/delete_pet/<int:pet_id>', methods=['DELETE'])
def delete_pet(pet_id):
    pet = Pet.query.get(pet_id)
    if pet is None:
        return jsonify({"message": "Pet not found"}), 404
    
    db.session.delete(pet)
    db.session.commit()
    
    return jsonify({"message": "Pet deleted successfully"}), 204
with app.app_context():
    db.create_all()

api.add_resource(TesteResource, '/Teste/<int:Teste_id>')
api.add_resource(PetResource, '/pet/<int:pet_id>')

if __name__ == '__main__':
    app.run()