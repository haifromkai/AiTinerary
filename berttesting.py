import torch
from transformers import BertTokenizer, BertModel
import numpy as np
import spacy
import re
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import nltk

# Download necessary NLTK data
# nltk.download('stopwords')
# nltk.download('wordnet')

class KeywordExtractor:
    def __init__(self, bert_model_name='bert-base-uncased'):
        """
        Initialize the keyword extractor with BERT model and NLP tools
        """
        # Load pre-trained BERT model and tokenizer
        self.tokenizer = BertTokenizer.from_pretrained(bert_model_name)
        self.model = BertModel.from_pretrained(bert_model_name)
        
        # Load spaCy for POS tagging and NER
        self.nlp = spacy.load("en_core_web_sm")
        
        # Set up stop words and lemmatizer
        self.stop_words = set(stopwords.words('english'))
        self.lemmatizer = WordNetLemmatizer()
    
    def preprocess_text(self, text):
        """Clean and prepare text for processing"""
        text = text.lower()
        text = re.sub(r'[^\w\s\-]', ' ', text)
        text = re.sub(r'\s+', ' ', text).strip()
        return text
    
    def extract_activity_keywords(self, text):
        """Extract activity-related noun keywords from text using spaCy"""
        doc = self.nlp(text)
        activities = []
        
        for token in doc:
            if token.pos_ == 'NOUN' and token.text.lower() not in self.stop_words:
                activities.append(token.lemma_)
        
        return list(set(activities))
    
    def extract_keywords(self, text, max_keywords=15):
        """
        Extract activity-related keywords from text
        """
        processed_text = self.preprocess_text(text)
        activities = self.extract_activity_keywords(processed_text)
        return activities[:max_keywords]
    
    def get_api_keywords(self, text, max_keywords=10):
        """
        Get activity-related keywords for API calls
        """
        keywords = self.extract_keywords(text, max_keywords)
        return keywords

# Usage example
def demonstrate_keyword_extraction():
    user_prompt = "Suggest the best museums for art, history, or science exploration. Recommend top camping spots with stunning natural views. \
        Identify thrilling biking trails for all skill levels. Highlight prime wildlife viewing areas and best times for sightings. \
        List breathtaking photography locations with unique landscapes. Provide must-try dining experiences featuring local cuisine. "
    
    extractor = KeywordExtractor()
    keywords = extractor.extract_keywords(user_prompt)
    print("Extracted Activity Keywords:", keywords)
    
    api_keywords = extractor.get_api_keywords(user_prompt)
    print("\nKeywords for API Call:", api_keywords)

if __name__ == "__main__":
    demonstrate_keyword_extraction()
