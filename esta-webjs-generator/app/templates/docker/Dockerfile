# Dockerfile for ESTA WebJS
FROM registry.sbb.ch/nginx-openshift-base
MAINTAINER Reto Lehmann <reto.lehmann@sbb.ch>

# Copy everything from tar to nginx web-folder
COPY build /usr/share/nginx/html

# Start nginx via script, which replaces static urls with environment variables
ADD start.sh /usr/share/nginx/start.sh
RUN ["chmod", "+x", "/usr/share/nginx/start.sh"]

CMD ["/usr/share/nginx/start.sh"]

