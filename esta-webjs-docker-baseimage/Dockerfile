# Base-Dockerfile for ESTA WebJS based applications
FROM openshift/origin-base

MAINTAINER Reto Lehmann <reto.lehmann@sbb.ch>

RUN echo "proxy=http://yourproxy:8080/" >> /etc/yum.conf \
    && echo "proxy_username=xxx" >> /etc/yum.conf \
    && echo "proxy_password=xxx" >> /etc/yum.conf

RUN yum install -y nginx \
 && yum clean all \
 && mkdir -p /var/lib/nginx/html \
 && mkdir -p /var/log/nginx

# fix permissions
RUN chmod -R 777 /usr/share/nginx
RUN touch /var/log/nginx/access.log
RUN touch /var/log/nginx/error.log
RUN chmod -R 777 /var/log/nginx
RUN chmod -R 777 /var/lib/nginx

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

COPY nginx/ /etc/nginx/

EXPOSE 8080

CMD ["nginx"]