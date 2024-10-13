import React, { createContext, useState, useEffect } from 'react';
import app from '../firebase/firebase.config';
import { GoogleAuthProvider,getAuth, createUserWithEmailAndPassword, onAuthStateChanged,signInWithPopup,signInWithEmailAndPassword,signOut  } from "firebase/auth";


export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider=new GoogleAuthProvider();

const AuthProvider = ({ children }) => {  // Accept `children` as a prop
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to create a user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const loginwithGoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const login=(email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut=()=>{
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe =onAuthStateChanged(auth,currentUser=> {
            //console.log(currentUser)
            setUser(currentUser);
            setLoading(false);
        });
        return()=>{
            return unsubscribe();
        }   
    },[])

    const authInfo = {
        user,
        createUser,
        loginwithGoogle,
        loading,
        login,
        logOut,
    };

    // Return the provider with the context value
    return (
        <AuthContext.Provider value={authInfo}>
            {children}  {/* Render children */}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
