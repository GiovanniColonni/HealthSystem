from flask import Blueprint, request
from flask import current_app as app

authentication = Blueprint('auth',__name__)

@authentication.route('/login/',methods=['GET','POST'])
def login():
	
	if(request.method=='POST'):
		return "Login Post"
	#return render_template('login.html')
	return "Login Get"
