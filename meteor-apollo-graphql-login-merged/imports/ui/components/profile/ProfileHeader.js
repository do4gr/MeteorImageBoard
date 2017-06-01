import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { withRouter, Redirect } from 'react-router'
import gql from 'graphql-tag'
import { Button, ButtonGroup } from 'reactstrap'
import AvatarEditor from 'react-avatar-editor'
import NavPersonalLists from './NavPersonalLists'

class ProfileHeader extends React.Component {
	constructor(props) {
		super(props);
		this.onClickSave = this.onClickSave.bind(this);
		this.onClickUpload = this.onClickUpload.bind(this);
		this.editProfilePicture = this.editProfilePicture.bind(this);
		this.canvas = <canvas id="myCanvas" onClick={this.editProfilePicture} width="250" height="300" style={{ border:"1px solid #000000" }} />;
		// TODO: Suchanfragen für die folgenden Variablen formulieren.
		this.state = {
			name: "Herbert",
			editor: <AvatarEditor
						ref={this.setEditorRef}
						image="http://coolwildlife.com/wp-content/uploads/galleries/post-3004/Fox%20Picture%20003.jpg"
						width={250}
						height={300}
						border={50}
						color={[255, 255, 255, 0.6]} // RGBA
						scale={1.2}
					/>,
			joinedAt: "07.06.1234",
			karma: "100"
		};
		console.log(this.props)
		this.loadData()
	}

	// den Editor zum Upload und Bearbeiten eines Profilbildes mache ich (Hendrik) noch fertig.
	onClickUpload () {
		//TODO
	}

	onClickSave () {
		// This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
		// drawn on another canvas, or added to the DOM.
		//this.state.canvas = this.state.editor.getImage();

		// If you want the image resized to the canvas size (also a HTMLCanvasElement)
		this.canvas = this.editor.getImageScaledToCanvas();
		this.canvas.setAttribute("id", "myCanvas");
		this.canvas.setAttribute("onClick", "{this.editProfilePicture}");

		document.getElementById("save-button").setAttribute("hidden", null);
		document.getElementById("profile-picture-editor").setAttribute("hidden", null);
		document.getElementById("myCanvas").removeAttribute("hidden");
	}

	editProfilePicture () {
		document.getElementById("save-button").removeAttribute("hidden");
		document.getElementById("profile-picture-editor").removeAttribute("hidden");
		document.getElementById("myCanvas").setAttribute("hidden", null);
	}

	setEditorRef = (editor) => {
		this.editor = editor
	}

  async loadData() {
		const result = await this.props.client.query({
			query: gql`
				{
					user {
						id
						name
					}
				}
			`
		})
		console.log(result)
		this.setState({ name: result.data.user.name })
	}


	render() {
		return (
			<div className="center-text">
				<h1>{this.state.name}</h1>
				{this.canvas}
				<div hidden id="profile-picture-editor">
					{this.state.editor}
				</div>
				<div hidden id="save-button">
					<ButtonGroup>
						<Button
							className='dib bg-primary text-white white pointer dim'
							onClick={this.onClickUpload}>
							Upload
						</Button>
						<Button
							className='dib bg-success text-white white pointer dim'
							onClick={this.onClickSave}>
							Save
						</Button>
					</ButtonGroup>
				</div>
				<div>
					Member since {this.state.joinedAt}.
				</div>
				<div>
					Karma: {this.state.karma}
				</div>
				<div>
					<NavPersonalLists />
				</div>
			</div>
		);
	}
}

export default withApollo(ProfileHeader)
