#!/bin/sh

# replace static values with environment-variables
if [ -n "$AUTHSERVER_URL" ]; then
    sed -i "s#http://localhost/#$AUTHSERVER_URL#g" /usr/share/nginx/html/bundle.js
fi

# start webserver
exec nginx
