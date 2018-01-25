### Use Cases
Our uses cases are listed below with '1' being highest priority use case.
1. Register a **new customer using Aadhaar based OTP**.
2. **Login** to an already existing account.
3. **Transfer funds** to another user.
4. Check **mini statement**.
5. View **transaction history**.
6. Create a **new type of account** for an existing user.
7. Change password.
8. Update personal information.


**1.	Use Case – Register a new Customer**  
_Actors_ – Customer, Bank  
_Description_ – This use case describes how to register a new customer using Aadhar based OTP.  

Normal Workflow –
  1.	The customer will click on the Register icon on the Home Page.
  2.	The customer will enter the Aadhaar number.
  3.	An OTP will be sent to the registered mobile number.
  4.	The customer will enter the OTP in the App.
  5.	All personal details linked to the Aadhaar card will be displayed to the user.
  6.	After verifying all the details, the customer will be asked to select the type of account that needs to be created
  7.	Now the customer will be prompted to enter a Username and Password
  8.	After confirming the password, a new account is created!  

Alternate Workflow -  
3a. If Aadhaar number is invalid
  1.	The App will display an error message.
  2.	The use case ends with a failure.

4a. If OTP is invalid
  1. The App will display an error message.
  2. The use case ends with a failure.  

7a. If Username / Password is invalid
  1. The App will display an error message.
  2. The use case ends with a failure.  

**2.	Use Case – Login to an existing account**  
_Actors_ – Customer, Bank  
_Description_ – This use case describes how to Login to an existing account  

Normal Workflow –
  1.	The user will click on the Login icon on the Home Page.
  2.	The user will now be prompted to enter the Username and Password or OTP or PIN.
  3.	After entering the right credentials, the user will be able to view his online account.

Alternate Workflow -    
2a. If Username is invalid
  1.	The App will display an error message.
  2.	The use case ends with a failure.  

2b. If Password/OTP/PIN is invalid
  1.	The App will display an error message.
  2.	The use case ends with a failure.

**3.	Use Case – Transfer funds to another User**  
_Actors_ – Customer, Bank  
_Description_ – This use case describes how to transfer funds to another User.  

Normal Workflow –
  1.	The user will click on the Transfer Funds option from the account Home Page.
  2.	The App will display the list of beneficiaries. If the beneficiary is not listed, the user will have to add the beneficiary to the list.
  3.	Once the beneficiary is added, the user can now transfer funds by clicking on the beneficiary name.
  4.	Now the user must validate the beneficiary details and enter the amount to be transferred.
  5.	The user will now have to select the account form which he/she wants to transfer funds.
  6.	To confirm the transfer , the user will have to read the Terms and Conditions and he/she will have to click on the “I agree” check box and then click on the conform button.
  7.	The user will now get a conformation message with the transaction details after the transaction is successful.

Alternate Workflow -
2a. If beneficiary details are incorrect or if the beneficiary is not listed in the database of the App
  1.	The App will display an error message.
  2.	The use case ends with a failure.  

4a. If the amount to be transferred is more than the balance available in the user’s account
  1.	The App will display an error message.
  2.	The use case ends with a failure.

**4.	Use Case – Check the mini statement**  
_Actors_ – Customer, Bank
_Description_ – This use case describes how to check the mini statement.  

Normal Workflow –
  1.	To check the mini statement, the user will have to click on the Account Summary button from the account Home Page.
  2.	On the Account Summary page, the user should click on “Mini Statement” option.
  3.	The App page will now display the mini statement of the user’s account!

No Alternate Workflow

**5.  Use Case – Check the transaction history**

_Actors_ – Customer, Bank  
_Description_ – This use case describes how to check the transaction history of the account.

Normal Workflow –
  1.	To check the mini statement, the user will have to click on the Account Summary button from the account Home Page.
  2.	On the Account Summary page, the user should click on “Transaction History” option
  3.	The App page will now display the transaction history of the user’s account!

No Alternate Workflow

**6.	Use Case – Create a new type of account for an existing user**

_Actors_ – Customer, Bank  
_Description_ – This use case describes how to create a new type of account for an existing user.  

Normal Workflow –
  1.	The user should select on the sign up option from the Home Page.
  2.	The user will now have to select on the option “Add another account”.
  3.	The user should now select the type of account that he/she wants to open.
  4.	The user should verify all the other details and then click on Add Account button.

No Alternate Workflow

**7.	Use Case – Change Password**

_Actors_ – Customer, Bank  
_Description_ – This use case describes how to change Password.  

Normal Workflow –
  1.	The user will have to sign into his/her account.
  2.	The user should now select Change Password option from the Account settings tab
  3.	The user will be prompted to enter the Old Password and the Aadhar Number.
  4.	The App will now send an OTP to the user’s registered mobile number.
  5.	The user should enter the OTP and click on OK
  6.	The user will now be able to change the Password by typing the new password and conforming the same.

Alternate Workflow -
3a. If Aadhaar number is invalid
  1.	The App will display an error message
  2.	The use case ends with a failure

3b. If Old Password is invalid
  1.	The App will display an error message
  2.	The use case ends with a failure

5a. If OTP is invalid
  1.	The App will display an error message
  2.	The use case ends with a failure.

**8.	Use Case – Update personal information**

_Actors_ – Customer, Bank
_Description_ – This use case describes how to update personal information.

Normal Workflow –
1.	The user will have to sign into his/her account.
2.	The user should now select Update Info option from the Account settings tab
3.	The user will be prompted to the Aadhar Number.
4.	The App will now send an OTP to the user’s registered mobile number.
5.	The user should enter the OTP and click on OK
6.	The user will now be able to change personal information in his account

Alternate Workflow -  
3a. If Aadhaar number is invalid
1.	The App will display an error message
2.	The use case ends with a failure

5a. If OTP is invalid
1.	The App will display an error message
2.	The use case ends with a failure
