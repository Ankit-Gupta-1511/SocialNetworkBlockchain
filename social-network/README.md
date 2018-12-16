# social-network

A decentralised social network

### Steps to start the blockchain network

1. Start the script ./downloadFabric.sh if fabric is not downloaded.
2. Start the script ./startFabric.sh.
3. Install the .bna on network through : composer network install -a ./dist/social-network@0.1.1.bna -c PeerAdmin@hlfv1
4. Start the network through: composer network start -c PeerAdmin@hlfv1 -n social-network -V 0.1.1 -A admin -S adminpw npmrcFile=npm.yaml
5. Start the single user web server through(should run on localhost: 3000): composer-rest-server -c admin@social-network -n always -u true -w true
6. Start the client app with npm start(should run on port 3001)
7. Start the multi-user web server at the port 3002 with: 