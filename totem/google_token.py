from requests.sessions import Session
from cachecontrol import CacheControl
import google.auth.transport.requests
from google.oauth2 import id_token


VALID_ISSUERS = ['accounts.google.com', 'https://accounts.google.com']
CACHED_SESSION = CacheControl(Session()) # non so cosa fa

# use google validation code for validete the token id, error in case of failures 
# otherwise return the decoded token
    
def validate_id_token(idt: str, client_id:str) ->dict:
    request = google.auth.transport.requests.Request(session=CACHED_SESSION)    
    id_info = id_token.verify_oauth2_token(idt, request, client_id)

    if id_info['iss'] not in VALID_ISSUERS:
        raise ValueError('wrong issuer')
    return id_info