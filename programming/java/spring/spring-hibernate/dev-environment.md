# Spring and Hibernate

- [Spring and Hibernate](#spring-and-hibernate)
  - [Setting Up the DEV Environment](#setting-up-the-dev-environment)
    - [Tomcat](#tomcat)
      - [Tomcat Session Running Issue](#tomcat-session-running-issue)
    - [Eclipse](#eclipse)
    - [Connecting Eclipse to Tomcat](#connecting-eclipse-to-tomcat)
  - [Installing Spring jar Files](#installing-spring-jar-files)

## Setting Up the DEV Environment

### Tomcat

- Download Tomcat from tomcat.apache.org.
- Run the installer.
  - Do the Full installation, and make sure it includes Tomcat as a Windows service.
- You can start and stop a Tomcat server in the Services.msc program.
- If the install worked, you can visit localhost:8080 and you should see the default Tomcat welcome page.

#### Tomcat Session Running Issue

- If you run into an issue with the port already being used, you can find out what's using it and, if necessary, force kill it.

```shell
> netstat -a -o -n
# find the record for port 8080.
# take note of its pid
> taskkill /f /pid {pid}
# enter the corresponding pid from step 1
```

### Eclipse

- Visit eclipse.org.
- Download the Eclipse IDE for Enterprise Java Developers package.
  - This has out-of-the-box support for web development.
- Extract the files to where you want them to live.
  - The extraction process is the installation.

### Connecting Eclipse to Tomcat

- To make development as easy as possible, you can connect your eclipse IDE to Tomcat directly.
  - This allows eclipse to start and stop the Tomcat server.
  - This streamlines web development.
- In the eclipse IDE, in the bottom pane, choose Servers.
  - Click the link to add a new server.
  - Specify the type of server as whatever version of Tomcat you have installed.
    - This is in the Apache subfolder.
  - In the next screen, select where your Tomcat installation lives. Default is `C:\Program Files\Apache Software Foundation\Tomcat X.X`
  - Click Finish.
- If it worked right, your Servers pane should now show your Tomcat server.

## Installing Spring jar Files

- Download the latest Spring dist from [repo.spring.io](https://repo.spring.io/release/org/springframework/spring/).
- Unzip the file wherever you want. You only need the `lib` folder and its contents.
- In an eclipse project, create a `lib` folder at the root of the project.
- Copy the contents of the Spring `lib` folder and paste it into the eclipse project `lib` folder.
- Right click on the project name in eclipse and select Properties.
  - Select Java Build Path.
  - Select Library > Classpath > Add jars.
  - Select the contents of your newly added eclipse `lib` folder and add them to the project.
  - Apply and close.
- If this worked correctly, you should now have a Referenced Libraries view in your project that contains references to those jar files.
