import React from "react";
import { Divider } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import CategoryForm from "../components/CategoryForm";

export default function CategoryEditPage() {
    const { id } = useParams();

    return (
        <>
            <h3>Edit category</h3>
            <Divider section/>

            <CategoryForm id={id}/>
        </>
    );
}
