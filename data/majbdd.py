import csv
import json

# Chemin des fichiers
csv_file = r"C:\Users\ghoudard\OneDrive - COMITE INTERPROFESSIONNEL DU VIN DE CHAMPAGNE\Desktop\certificat_de_taille\data\questionnaires.csv"
json_file = r"C:\Users\ghoudard\OneDrive - COMITE INTERPROFESSIONNEL DU VIN DE CHAMPAGNE\Desktop\certificat_de_taille\data\questions.json"

# Charger le fichier CSV
with open(csv_file, mode='r', encoding='utf-8') as file:
    reader = csv.reader(file, delimiter=';')
    next(reader)  # Sauter la première ligne d'en-têtes

    questions = []

    for row in reader:
        # Préparer la question avec les éléments extraits de la ligne
        question_data = {}

        # Traiter la première colonne : ID et question
        id_question = row[0].split(";", 1)  # Séparer l'ID de la question
        question_data["id"] = id_question[0]
        question_data["question_text"] = id_question[1] if len(id_question) > 1 else ""

        # Ajouter les options et la réponse correcte
        question_data["option_a"] = row[1] if len(row) > 1 else ""
        question_data["option_b"] = row[2] if len(row) > 2 else ""
        question_data["option_c"] = row[3] if len(row) > 3 else ""
        question_data["correct_option"] = row[4] if len(row) > 4 else ""

        # Ajouter la question à la liste
        questions.append(question_data)

# Convertir en JSON et sauvegarder dans le fichier JSON
with open(json_file, mode='w', encoding='utf-8') as json_output:
    json.dump(questions, json_output, ensure_ascii=False, indent=4)

print(f"Le fichier JSON a été sauvegardé sous {json_file}")
