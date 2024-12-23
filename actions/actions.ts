"use server";

import { auth } from "@clerk/nextjs/server";

export const creatNewDocument = async () => {
    
    auth.protect();
    // Create a new document
    


};
