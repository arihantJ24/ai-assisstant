"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("d735933d-9264-4166-a8ab-86e4e6e75a76");
    }, []);
    
    return null;
}