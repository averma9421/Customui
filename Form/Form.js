if (Meteor.isClient) {
	
	Meteor.startup(function () {
    Session.set("resetPass",false); //set the resetPass to false initially
    
  });
	
	
   Template.register.events({
    'submit form': function(event) {
        event.preventDefault();
		var unameVar = event.target.username.value;    //fetching the username, email and password
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        Accounts.createUser({  //creating new user
			username:unameVar,
            email: emailVar,
            password: passwordVar
        },
		function(err)   //Displays a message in the case of an error.
		{
			if(error)
			{
				alert("Account is not created");
				
			}
			
		});
	}
   });

	
	
	
	Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.UnameEmail.value;   //fetching email or username and password
		var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar,function(error){   //login with email or username and password
			
			
			if(error)   //Displays a message in the case of an error.
			{
				alert("wrong credentials");
				
			}
		});
    }
});

Template.recovery.helpers({    //template for account password recovery
	"resetPassword" : function(){     
		if(Accounts._resetPasswordToken)      
		{
			Session.set("resetToken",Accounts._resetPasswordToken)   //token is set
			Session.set("resetPass",true);   
		}	
return Session.get("resetPass");		//returns the resetPass
	}
	
	
});

Template.recovery.events({
	
	"submit #recovery-form" : function(e,t){    //password recovery form
		e.preventDefault();
		var email = t.find("#recovery-email").value;   //fetch the recovery email
	   // alert(email);
		Account.forgotPassword({email:email}, function(error){    //Displays a message in the case of an error.
			if(error){
				
				alert("unable to send reset link");
			}
			else
			{
				alert("mail sent");
			}
			
		})
		
	},
	
	
  "submit #new-password" : function(e,t){    //Password reset Template
	e.preventDefault();
	var newPass= t.find("#new-password-password").value;  //fetches the new password
	Account.resetPassword(Session.get("resetToken"),newPass,function(error){  //reset password
		
		if(error){ //Displays a message in the case of an error.
			
			alert("password not changed");
			
			
		}
		else{
			
			alert("password changed successfully");
		}
		
		
		
		
	});
	
}
	
});






Template.dashboard.events({ //display the dashboard to the logged-in user
    'click .logout': function(event){
        event.preventDefault(); //prevents default actions
        Meteor.logout();
    }
});
	
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://postmaster%40sandbox3de97c0eb15f42e4aba2a35e457a43df.mailgun.org:bf0373ece553c15d9dc41c7e6608f07fsmtp.mailgun.org:587';  //environment variable
    Accounts.emailTemplates.from = "Verification Link";  //displays this to the receiver of the mail
  
  });
}
