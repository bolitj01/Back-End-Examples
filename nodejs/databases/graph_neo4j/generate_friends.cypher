//Import the names.csv file to create users with a property name in Neo4j
//Run this script in Neo4j Browser to generate random friends for each user
//Give each user 5-20 random friends
//Find all users as u1
MATCH (u1:User)
CALL (u1) {
    //Subquery find 20 random other people
    MATCH (u2:User)
    WHERE u1 <> u2
    RETURN u2
    ORDER BY rand()
    LIMIT toInteger(5 + rand() * 10) // Generates a random limit between 5 and 15
}
//Avoid duplicate relationships with MERGE instead of CREATE
MERGE (u1)-[:FRIEND_WITH]->(u2);