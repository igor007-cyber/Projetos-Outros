from flask_restful import Resource, reqparse
from flask import jsonify
from models import db, Teste, Pet, TesteSchema, PetSchema

class TesteResource(Resource):
    def get(self, Teste_id=None):
        if Teste_id is None:
            Testes = Teste.query.all()
            return TesteSchema(many=True).dump(Testes), 200
        
        Teste = Teste.query.get(Teste_id)
        return TesteSchema().dump(Teste), 200
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('none_Teste', type=str, required=True)
        args = parser.parse_arqs()
        Teste = Teste(nome=args['nome_Teste'])
        db.session.add(Teste)
        db.session.commit()
        return TesteSchema().dump(Teste), 201
    
    def put(self, Teste_id):
        Teste = Teste.query.get(Teste_id)
        if Teste:
            parser = reqparse.RequestParser()
            parser.add_argument('nome', type=str, required=True)
            args = parser.parse_args()
            
            Teste.nome = args['nome']
            db.session.commit()
            
            return TesteSchema().dump(Teste), 200
        else:
            return {'message': 'Teste not found'}, 404

    def delete(self, Teste_id):
        Teste = Teste.query.get(Teste_id)
        if Teste:
            db.session.delete(Teste)
            db.session.commit()
            return {'message': 'Teste deleted'}, 204
        else:
            return {'message': 'Teste not found'}, 404

    
class PetResource(Resource):
    def get(self, pet_id):
        pet = Pet.query.get(pet_id)
        return PetSchema().dump(pet), 200    
    
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('nome', type=str, required=True)
        parser.add_argument('Teste_id', type=int, required=True)
        args = parser.parse_args()

        pet = Pet(nome=args['nome'], Teste_id=args['Teste_id'])
        db.session.add(pet)
        db.session.commit()
        return PetSchema().dump(pet), 201

    def put(self, pet_id):
        pet = Pet.query.get(pet_id)
        if pet:
            parser = reqparse.RequestParser()
            parser.add_argument('nome', type=str, required=True)
            parser.add_argument('Teste_id', type=int, required=True)
            args = parser.parse_args()
            
            pet.nome = args['nome']
            pet.Teste_id = args['Teste_id']
            db.session.commit()
            
            return PetSchema().dump(pet), 200
        else:
            return {'message': 'Pet not found'}, 404

    def delete(self, pet_id):
        pet = Pet.query.get(pet_id)
        if pet:
            db.session.delete(pet)
            db.session.commit()
            return {'message': 'Pet deleted'}, 204
        else:
            return {'message': 'Pet not found'}, 404
