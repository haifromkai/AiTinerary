# Sample Activity Prompts
# ap = "I would like to go camping, fishing, and hiking."
ap = "For my trip to Japan, my interests include food experiences, cultural sites, nature, and some quirky/unique attractions. I prefer a mix of popular spots and hidden gems, with 3 to 4 activities per day plus meal recommendations. I'm traveling with my partner who enjoys photography."
# ap = "I would like to go camping, hiking, fishing, and eating"

# Import KeyBERT model and other necessary libraries
from keybert import KeyBERT
from sentence_transformers import SentenceTransformer, util
import numpy as np

# Initialize models
kw_model = KeyBERT('all-distilroberta-v1')
sentence_model = SentenceTransformer('all-distilroberta-v1')

# Step 1: Extract keywords/keyphrases from the document
# Extract both single words and phrases
extracted_keywords = kw_model.extract_keywords(
    ap, 
    keyphrase_ngram_range=(1, 2),
    stop_words='english',
    top_n=150  # Extract more keywords to have a better chance of matching
)

# Step 2: Define your preset candidates
preset_candidates = ["restaurants dining", "cafes bakeries", "bars nightlife", "museums galleries", "historical sites", "parks nature","shopping retail","entertainment venues","sports recreation","spa wellness","tours sightseeing","beaches water activities","family kid friendly","hiking trails","viewpoints photography"]
preset_candidates2 = {
            "restaurants_dining": ["restaurant", "dining", "food", "cuisine", "meal", "dinner", "lunch", "breakfast", "eat", "culinary", "chef", "taste", "gourmet", "local food"],
            "cafes_bakeries": ["cafe", "coffee", "bakery", "pastry", "dessert", "brunch", "tea", "espresso", "croissant", "patisserie"],
            "bars_nightlife": ["bar", "nightlife", "club", "pub", "cocktail", "drink", "beer", "wine", "dance", "night", "party", "lounge"],
            "museums_galleries": ["museum", "gallery", "exhibition", "art", "collection", "artifact", "exhibit", "display", "contemporary"],
            "historical_sites": ["history", "historical", "ancient", "heritage", "ruins", "monument", "landmark", "castle", "palace", "temple", "cathedral", "church", "archaeological"],
            "parks_nature": ["park", "nature", "garden", "outdoor", "forest", "mountain", "landscape", "flora", "wildlife", "botanical", "reserve", "natural"],
            "shopping_retail": ["shopping", "shop", "market", "mall", "boutique", "store", "retail", "buy", "souvenir", "fashion", "outlet"],
            "entertainment_venues": ["entertainment", "theater", "cinema", "concert", "festival", "show", "performance", "music", "event", "venue"],
            "sports_recreation": ["sport", "recreation", "activity", "adventure", "fitness", "game", "play", "bike", "cycle", "swim", "climb"],
            "spa_wellness": ["spa", "wellness", "massage", "relax", "relaxation", "therapy", "treatment", "health", "meditation", "yoga", "rejuvenate"],
            "tours_sightseeing": ["tour", "sightseeing", "guide", "guided", "excursion", "trip", "visit", "attraction", "explore", "discovery"],
            "beaches_water_activities": ["beach", "water", "ocean", "sea", "coast", "snorkel", "dive", "swim", "surf", "kayak", "boat", "sailing", "island"],
            "family_kid_friendly": ["family", "kid", "child", "children", "friendly", "fun", "play", "playground", "amusement", "theme park", "zoo", "aquarium"],
            "hiking_trails": ["hiking", "hike", "trail", "trek", "walk", "trekking", "path", "route", "backpacking", "wilderness", "outdoor"],
            "viewpoints_photography": ["view", "viewpoint", "vista", "panorama", "scenic", "photography", "photo", "camera", "picture", "landscape", "overlook", "sunset", "sunrise"]
        }

# Step 3: Calculate similarity between preset candidates and extracted keywords
results = []

# Extract just the keywords from the extracted_keywords list of tuples
extracted_keywords_list = [kw for kw, _ in extracted_keywords]
extracted_keywords_dict = dict(extracted_keywords)

# Encode extracted keywords
keyword_embeddings = sentence_model.encode(extracted_keywords_list)

# Print all extracted keywords to see if 'food' is present
print("All extracted keywords:")
for kw, score in extracted_keywords:
    print(f"'{kw}': {score:.4f}")

# Use preset_candidates2 instead of preset_candidates
for category, terms in preset_candidates2.items():
    # Encode all terms for this category
    terms_embeddings = sentence_model.encode(terms)
    
    # For each term in the category, find the best matching extracted keyword
    category_matches = []
    
    for term_idx, term_embedding in enumerate(terms_embeddings):
        # Calculate similarity with each extracted keyword
        similarities = util.cos_sim(term_embedding, keyword_embeddings)[0].numpy()
        
        # Find the most similar extracted keyword
        max_sim_idx = np.argmax(similarities)
        max_sim = similarities[max_sim_idx]
        best_match_keyword = extracted_keywords_list[max_sim_idx]
        best_match_score = extracted_keywords_dict[best_match_keyword]
        
        # Store the result if similarity is above threshold
        if max_sim > 0.5:  # Adjust this threshold as needed
            category_matches.append({
                'category': category,
                'term': terms[term_idx],
                'best_match': best_match_keyword,
                'extraction_score': best_match_score,
                'similarity_score': float(max_sim),
                'combined_score': best_match_score * float(max_sim)
            })
    
    # If we found matches for this category, add the best one to results
    if category_matches:
        # Sort by combined score and take the best match
        category_matches.sort(key=lambda x: x['combined_score'], reverse=True)
        best_match = category_matches[0]
        
        results.append({
            'category': category,
            'best_term': best_match['term'],
            'best_match_keyword': best_match['best_match'],
            'extraction_score': best_match['extraction_score'],
            'similarity_score': best_match['similarity_score'],
            'combined_score': best_match['combined_score']
        })

# Sort by combined score
results.sort(key=lambda x: x['combined_score'], reverse=True)

# Print results
print("\nCategories matched to extracted keywords:")
for result in results:
    print(f"'{result['category']}' (via term '{result['best_term']}') → '{result['best_match_keyword']}' (extraction score: {result['extraction_score']:.4f}, similarity: {result['similarity_score']:.4f}, combined: {result['combined_score']:.4f})")

# Get the top categories
top_categories = [result['category'] for result in results[:5]]
print("\nTop 5 categories:", top_categories)