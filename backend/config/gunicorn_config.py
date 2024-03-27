#Gunicorn server config file

#command to the gunicorn executable path - which will be found on applcation server
command = "/pld+/bin/gunicorn"


#The ip address gunicorn will expose or be  listened on
bind = "127.0.0.1:8000"

#Workers for gunicorn
workers=1
