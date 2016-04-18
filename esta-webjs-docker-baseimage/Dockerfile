# Base-Dockerfile for ESTA WebJS based applications
FROM openshift/origin-base

MAINTAINER Reto Lehmann <reto.lehmann@sbb.ch>

RUN echo "proxy=http://yourproxy:8080/" >> /etc/yum.conf \
    && echo "proxy_username=xxx" >> /etc/yum.conf \
    && echo "proxy_password=xxx" >> /etc/yum.conf

RUN yum install -y nginx \
 && yum clean all \
 && mkdir -p /var/lib/nginx/html

# fix permissions
RUN chmod -R 777 /usr/share/nginx/html /var/log/nginx

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

COPY nginx/ /etc/nginx/

EXPOSE 8080

CMD ["nginx"]