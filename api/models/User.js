function User( id 
             , firstName
             , lastName
             , email
             , password
             ) {

  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.password = password;
};

module.exports = User;
