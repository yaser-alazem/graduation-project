import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Dropzone from 'react-dropzone';
import axios from 'axios';

//import InputGroup from '../common/InputGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';

export class ProductForm extends Component {
  state = {
    name: '',
    description: '',
    specifications: '',
    price: 0,
    prevPrice: 0,
    offer: false,
    itemsNumber: 0,
    image: '',
    errors: {},
    disabled: true
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onChecked = e => {
    this.setState({
      disabled: !this.state.disabled,
      offer: !this.state.offer
    });
  };
  onUpload = e => {
    e.preventDefault();
    //let image = e.currentTarget.querySelector('input[type="file"]').value;
    axios
      .post(`/api/products/product/images/upload`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  handleOnDrop = (files, rejectedFiles) => {
    console.log(files);
    files.forEach((file, i) => this.setState({ image: file.name }));
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', `codeinfuse, medium, gist`);
      formData.append(
        'upload_preset',
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      ); // Replace the preset name with your own
      formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
      formData.append('timestamp', (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios
        .post(
          'https://api.cloudinary.com/v1_1/dujpb3qos/image/upload',
          formData,
          {
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
          }
        )
        .then(response => {
          const data = response.data;
          const fileURL = data.secure_url; // You should store this URL for future references in your app
          console.log(data);
        });
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
    });
  };
  render() {
    const { errors } = this.state;

    return (
      <div className="add-product">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Back to dashboard
              </Link>
              <h1 className="text-center display-4">Add Product</h1>
              <p className="lead text-center">
                Add a new product, and make sure to include any details with
                spesifications.
              </p>
              <small className="d-block mb-3 text-muted">
                * = required field
              </small>
              <form>
                <div className="from-group">
                  <TextFieldGroup
                    placeholder="* Name"
                    name="name"
                    onChange={this.onChange}
                    type="text"
                    error={errors.name}
                    value={this.state.name}
                    info="Be specific"
                  />
                  <TextFieldGroup
                    placeholder="* Price"
                    name="price"
                    onChange={this.onChange}
                    type="number"
                    error={errors.price}
                    value={this.state.price}
                    info="Product selling price in USD$ currency"
                  />
                  <TextFieldGroup
                    placeholder="Price before markdown offer"
                    name="prevPrice"
                    onChange={this.onChange}
                    type="number"
                    error={errors.prevPrice}
                    value={this.state.prevPrice}
                    info="Product selling price in USD$ currency before this offer takes place"
                    disabled={this.state.disabled ? 'disabled' : ''}
                  />
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="offer"
                      value={this.state.offer}
                      checked={this.state.offer}
                      onChange={this.onChecked}
                      id="offer"
                    />
                    <label htmlFor="current" className="form-check-label">
                      Offer
                    </label>
                  </div>
                  <TextFieldGroup
                    placeholder="* Available items number for selling"
                    name="itemsNumber"
                    onChange={this.onChange}
                    type="number"
                    error={errors.itemsNumber}
                    value={this.state.itemsNumber}
                    info="The exact number of this product items which available for selling"
                  />
                  <Dropzone
                    onDrop={this.handleOnDrop}
                    multiple
                    accept="image/*"
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        className="input-group upload-box"
                      >
                        <div className="upload-box-text">
                          <input
                            {...getInputProps()}
                            className="form-control form-control-lg"
                            type="file"
                            name="image"
                          />
                          <p className="input-group-text">
                            Browse for images Or Drop the images here{' '}
                            <i className="fas fa-upload fa-2x ml-2" />{' '}
                          </p>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                  <small>
                    Upload your product's images by drag &amp; drop OR select
                    them from your local storage drive
                  </small>
                  {/* <form onSubmit={this.onUpload}>
                    <TextFieldGroup
                      name="image"
                      onChange={this.onChange}
                      type="file"
                      error={errors.image}
                      value={this.state.image}
                      info="Select product image and press upload button before submitting the product"
                    />
                    <input type="submit" />
                  </form> */}
                  <TextAreaFieldGroup
                    placeholder="Product description"
                    className="mt-4"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    info="A brief description about the product"
                  />
                  <TextAreaFieldGroup
                    placeholder="Product specifications. Seperate each specification with a (-) from the next one"
                    name="specifications"
                    value={this.state.specifications}
                    onChange={this.onChange}
                    error={errors.specifications}
                    info="Type all product specifications, make sure to put a (-) to seperate each specification from the next one"
                  />
                  <button type="submit" className="btn btn-dark">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductForm;
