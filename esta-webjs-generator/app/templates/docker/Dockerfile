# Dockerfile for ESTA WebJS
FROM registry.sbb.ch/nginx-openshift-base
MAINTAINER Reto Lehmann <reto.lehmann@sbb.ch>

# Download sources from Repository
RUN wget 'http://$NEXUS_URL/service/local/artifact/maven/redirect?r=mirror&g=ch.sbb.esta.webjs&a=esta-webjs-starterkit&v=$VERSION&p=tar.gz' -O esta-webjs-starterkit.tar.gz

# Extract tar
RUN tar -xzf esta-webjs-starterkit.tar.gz

# Copy everything from tar to nginx web-folder
COPY build /usr/share/nginx/html

# Start nginx via script, which replaces static urls with environment variables
ADD start.sh /usr/share/nginx/start.sh
RUN ["chmod", "+x", "/usr/share/nginx/start.sh"]

CMD ["/usr/share/nginx/start.sh"]

