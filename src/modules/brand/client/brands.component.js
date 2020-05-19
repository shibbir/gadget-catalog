import React, { useState, useEffect } from "react";
import { Segment, Icon, Header, Button, Label, Modal } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { getBrands } from "./brand.actions";
import BrandForm from "./brand-form.component";

export default function Brands() {
    const dispatch = useDispatch();
    const [brandId, setBrandId] = useState(undefined);

    useEffect(() => {
        dispatch(getBrands());
    }, []);

    const user = useSelector(state => state.userReducer.loggedInUser);
    const brands = useSelector(state => state.brandReducer.brands);

    const labels = brands.map(x => {
        return (
            <Button as="div" labelPosition="right" key={x._id} style={{marginBottom: "20px", marginRight: "20px"}}>
                <Button basic color="teal" as="a" href={`/items?brandId=${x._id}`}>
                    {x.name}
                </Button>
                {user && user._id && user._id === x.createdBy &&
                    <Label as="a" basic color="teal" pointing="left" onClick={() => setBrandId(x._id)}>
                        <Icon name="edit" color="blue"/>
                    </Label>
                }
            </Button>
        );
    });

    return (
        <>
            { labels.length > 0 &&
                <>
                    <Segment raised className="stacked">
                        <Header as="h2">
                            <Icon name="archive" circular/>
                            <Header.Content>
                                Available Brands: {brands.length}
                            </Header.Content>
                        </Header>
                        <Button onClick={() => setBrandId(null)}>Add new brand</Button>
                    </Segment>

                    {labels}

                    <Modal dimmer size="tiny" open={brandId !== undefined}>
                        <Modal.Header>Brand Form</Modal.Header>
                        <Modal.Content>
                            <Modal.Description>
                                <BrandForm id={brandId}/>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color="black" onClick={() => setBrandId(undefined)}>
                                Close
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </>
            }

            { labels.length === 0 &&
                <Segment placeholder raised>
                    <Header icon>
                        <Icon name="warning sign"/>
                        You don't have any brands added yet!
                    </Header>
                </Segment>
            }
        </>
    );
}
