# sekret

# Why ?

It is a simple solution to encrypt / decrypt files with a password

# How ?

# Alice encrypt the file

First install `sekret` globally:

```
npm install -g sekret
```

Then gather your team and choose a password.

Once you have it, go to your repository folder and initialize `sekret` with the choosen password:

```
cd myproject/
sekret
```

```
sekret~$ init mypassword
```

Now you can encrypt a file in order to share it with your team:

```
sekret~$ encrypt fileContainingConfidentialInfo.txt
```
 
After that, you can push the file `fileContainingConfidentialInfo.txt.sekret` and the modification of `.gitignore` (**very important!**).

# Bob decrypt the file

Now Bob, your fellow friend, can:
- clone the repo of your project,
- install `sekret` globally
- init `sekret` with the same password as Alice
- decrypt the file:

```
cd myproject/
sekret
```
```
sekret~$ decrypt fileContainingConfidentialInfo.txt
```

The `fileContainingConfidentialInfo.txt` file is now decrypted! 

