import tweepy
import json
import sys
import time
from pprint import pprint
from flask_cors import CORS
import requests
from flask import Flask,request
#########################################CONSTANTS AND AUTHENTACATION################################
app = Flask(__name__)
CORS(app)

access_token = '1077737654110760960-ndfzGh72jq0KxdhWoY4TNkVCS4IvQR'
access_secret = 'dRrHteuBNAB9fGfge8vwwZ4bAy1cmQXsJCTufeWiyHZG9'
consumer_key= 'qt7TGoQVKMFZZnpaFy4bkR4tX'
consumer_secret = 'hMxjL3aUw3jcTxHdnr1wWpoYXtUOXu4G12ZCs0bLVbJiRyQUBA'

username = "apikey"
password = "iH8893SgeuzDpXY6WSkj4D6Gx1BzbVLUWdxjKI0QRYQx"
url = "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)

api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)

final_result = {}
########################################################################################################################
class MyStreamListener(tweepy.StreamListener):

    tweets = []
    keywords = []
    ids = set()

    def on_status(self, status):
        print(status.text)

    def on_error(self, status_code):
        if status_code == 420:
            #returning False in on_error disconnects the stream
            return False
        # returning non-False reconnects the stream, with backoff.


    def on_data(self, data):
        all_data = json.loads(data)
        for keyword in keywords:
            if "id" in all_data and all_data["id"] not in MyStreamListener.ids:
                x = all_data["id"]
                MyStreamListener.ids.add(all_data["id"])
                if "extended_tweet" in all_data.keys():
                    tweet = all_data["extended_tweet"]["full_text"]
                elif "retweeted_status" in all_data.keys():
                    if "extended_tweet" in all_data["retweeted_status"].keys():
                        tweet = all_data["retweeted_status"]["extended_tweet"]["full_text"]
                    else:
                        tweet = all_data["retweeted_status"]["text"]
                else:
                    tweet = all_data["text"]
                if tweet.lower().find(keyword.lower()) != -1:
                    print("****************** New Tweet *****************")
                    print(tweet,x)
                    print("**********************************************\n")
                    MyStreamListener.tweets.append(tweet)

            return True

def get_tweets(keywords):
    tweets = []
    tweets_statuses = []

    for keyword in keywords:
        tweets_statuses += api.search(q=keyword, lang="en", rpp=100)

    for tweet_status in tweets_statuses:
        all_data = json.loads(json.dumps(tweet_status._json))
        for keyword in keywords:
            if "extended_tweet" in all_data.keys():
                tweet = all_data["extended_tweet"]["full_text"]
            elif "retweeted_status" in all_data.keys():
                if "extended_tweet" in all_data["retweeted_status"].keys():
                    tweet = all_data["retweeted_status"]["extended_tweet"]["full_text"]
                else:
                    tweet = all_data["retweeted_status"]["text"]
            else:
                tweet = all_data["text"]

            if tweet.lower().find(keyword.lower()) != -1:
                tweets.append(tweet)
    return {"tweets":tweets}

def analyze_data(fresh = None):
    d = {}
    if fresh is None:
        f = open("tweets.json")
        d = json.load(f)
        f.close()
    else:
        d = fresh

    tweets = d["tweets"]
    tweet_string = ""
    for t in tweets:
        sub = t.replace("."," ")
        tweet_string += sub + "."

    tone_data = {
    "text":tweet_string
    }

    return tone_data

def analyze(d):
    headers = {"content-type": "application/json"}
    r = requests.post(url,auth=(username,password),headers = headers,json=d)
    response = json.loads(r.text)
    tones = {"sadness":[],"joy":[],"confident":[],"analytical":[]}
    if "sentences_tone" in response:
        for res in response["sentences_tone"]:
            if len(res["tones"]):
                for tone in res["tones"]:
                    if tone["tone_id"] in tones:
                        tones[tone["tone_id"]].append(tone["score"])
    return tones

########################################################################################################################
@app.route("/",methods=["GET"])
def get_data():
    final_result = get_tweets(myStreamListener.keywords)
    pprint(final_result)
    the_end = analyze(analyze_data(final_result))
    final_result["tweets"] = []
    myStreamListener.tweets = []
    return the_end

@app.route("/",methods=["POST"])
def change_keywords():
    myStreamListener.tweets = []
    content = request.json
    keywords = content["keywords"]
    myStreamListener.keywords = keywords
    final_result= get_tweets(keywords)
    pprint(final_result)
    the_end = analyze(analyze_data(final_result))
    return the_end


if __name__ == "__main__":
    keywords = ['ibm', 'bluemix', 'ibm cloud', 'watson ai', 'blockchain', 'redhat']

    myStreamListener = MyStreamListener()
    myStreamListener.keywords = keywords
    app.run()
