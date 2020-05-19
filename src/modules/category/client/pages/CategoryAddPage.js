import React from "react";
import { Divider } from "semantic-ui-react";
import CategoryForm from "../components/CategoryForm";

export default function CategoryAddPage() {
    return (
        <>
            <h3>Add new category</h3>
            <Divider section />

            <CategoryForm/>
        </>
    );
}
