FROM openjdk:14
VOLUME /tmp
ARG JAR_FILE=target/InventoryApp-1.0-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar /app.jar"]