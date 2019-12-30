# Building a Full Stack Spring Boot Application

## Process

- Create your database, tables, and users in MySQL (or whatever database you're using).
- Create your project shell, adding in your dependencies and libraries.
- Test your database connectivity between your project and database.
- Set up dev environment.
  - Add your web.xml and spring config files.
  - Load our JSTL, Spring, and Hibernate JARs.
- Update the spring mvc configuration XML with the following items:
  - Define database dataSource and connection pool.
    - This tells Spring how to connect to your database.
  - Set up Hibernate session factory.
    - You'll reference the name you gave the dataSource in step 1.
  - Set up Hibernate transaction manager.
    - You'll reference the section factory you created in step 2.
  - Enable configuration of transactional annotations.
    - Again, you'll reference the configuration id you set up in the previous step.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:context="http://www.springframework.org/schema/context"
    xmlns:tx="http://www.springframework.org/schema/tx"
  xmlns:mvc="http://www.springframework.org/schema/mvc"
  xsi:schemaLocation="
    http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd
    http://www.springframework.org/schema/mvc
    http://www.springframework.org/schema/mvc/spring-mvc.xsd
    http://www.springframework.org/schema/tx
    http://www.springframework.org/schema/tx/spring-tx.xsd">

  <!-- Add support for component scanning -->
  <context:component-scan base-package="com.luv2code.springdemo" />

  <!-- Add support for conversion, formatting and validation support -->
  <mvc:annotation-driven/>

  <!-- Define Spring MVC view resolver -->
  <bean
    class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="/WEB-INF/view/" />
    <property name="suffix" value=".jsp" />
  </bean>

    <!-- Step 1: Define Database DataSource / connection pool -->
  <bean id="myDataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource"
          destroy-method="close">
        <property name="driverClass" value="com.mysql.cj.jdbc.Driver" />
        <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/web_customer_tracker?useSSL=false&amp;serverTimezone=UTC" />
        <property name="user" value="springstudent" />
        <property name="password" value="springstudent" />

        <!-- these are connection pool properties for C3P0 -->
        <property name="minPoolSize" value="5" />
        <property name="maxPoolSize" value="20" />
        <property name="maxIdleTime" value="30000" />
  </bean>

    <!-- Step 2: Setup Hibernate session factory -->
  <bean id="sessionFactory"
    class="org.springframework.orm.hibernate5.LocalSessionFactoryBean">
    <property name="dataSource" ref="myDataSource" />
    <property name="packagesToScan" value="com.luv2code.springdemo.entity" />
    <property name="hibernateProperties">
       <props>
          <prop key="hibernate.dialect">org.hibernate.dialect.MySQLDialect</prop>
          <prop key="hibernate.show_sql">true</prop>
       </props>
    </property>
   </bean>

    <!-- Step 3: Setup Hibernate transaction manager -->
  <bean id="myTransactionManager"
            class="org.springframework.orm.hibernate5.HibernateTransactionManager">
        <property name="sessionFactory" ref="sessionFactory"/>
    </bean>

    <!-- Step 4: Enable configuration of transactional behavior based on annotations -->
  <tx:annotation-driven transaction-manager="myTransactionManager" />

</beans>
```

- Create classes for your entities.
- Create your DAOs.
  - Define the interface.
  - Define the implementation.
- Create controllers for your entities.
- Inject DAOs into controllers.
- Create jsp pages for displaying your data.
- Add CSS and other resources.
- Configure Spring to serve CSS and other static resources via the config XML.

```xml
<mvc:resources location="/resources/" mapping="/resources/**"/>
```

- Reference CSS and other static resources in your JSP.
- Configure welcome file in web.xml.
