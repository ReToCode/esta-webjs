# Base-Dockerfile for ESTA WebJS based applications
FROM openshift/origin-base

MAINTAINER Reto Lehmann <reto.lehmann@sbb.ch>

RUN yum install -y nginx \
 && yum clean all \
 && mkdir -p /var/lib/nginx && chmod -R 777 /var/lib/nginx \
 && mkdir -p /var/log/nginx && chmod -R 777 /var/log/nginx

COPY nginx/ /etc/nginx/

VOLUME ["/var/log/nginx"]

EXPOSE 8080

CMD ["nginx"]
