#FILE THAT RUNS THE API
#WILL ALSO BE USED TO CONNECT GUNICORN OR WSGI TO NGINX SERVER ON PORT 8000 (I think)

from backend import app


if __name__ == "__main__":
    app.run()