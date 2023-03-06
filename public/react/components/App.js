import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [pages, setPages] = useState([]);
	const [article, setArticle] = useState('');
	const [isAddingArticle, setIsAddingArticle] = useState(false);

	//Adding a new page

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [tags, setTags] = useState('');


	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki/`);
			const pagesData = await response.json();
			setPages(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	async function wikiHandler(index) {
		try {
			//let indexA = pages.indexOf(article);
			
			//console.log(indexA);
			const slug = pages[index].slug
			const response = await fetch(`${apiURL}/wiki/${slug}`);
			const articleH = await response.json();
			console.log(articleH);
			setArticle(articleH);
			console.log(article);
			console.log(pages);

			
		}catch (err) { 
			console.log("Oh no an error! ", err);
		}
	}

	async function addPage() {
		const response = await fetch(`${apiURL}/wiki/`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(
				articleData = {
					title: title,
					content: content,
					name: name,
					email: email,
					tags: tags
				}
			)
		});
		const data = await response.json();
		fetchPages();
		//setArticle('');
	}

	async function removePage() { 
		let index = -1;
		for(page of pages) {
			console.log(page.id);
			console.log(article.id);
			if(page.id === article.id) {
				 index = pages.indexOf(page);
				console.log("Checking index array:", index);
			}
			
		}
		//console.log(SaSQA);
		const slug = pages[index].slug;
		console.log(slug);
		const response = await fetch(`${apiURL}/wiki/${slug}`, {
  			method: "DELETE"
		});
		const data = await response.json();
		fetchPages();
		setArticle('');
	}
	

	useEffect(() => {
		fetchPages();
	}, []);

	
	

	if(article == '' && isAddingArticle == false) {
		return (
			<>
			<main>	
				<h1>WikiVerse</h1>
				<h2>An interesting 📚</h2>
				
				<PagesList pages={pages} wikiHandler={wikiHandler}/>
				<button onClick={() => setIsAddingArticle(true)}>Add a Page</button>
			</main>
			</>
		)
	} else if (article != '' && isAddingArticle == false) {
		return (
			<>
			<main > 
				<h2 id="Box123">{article.title}</h2>
				<p id="Box123"><strong id="Box123">Author:</strong> {article.author.name}</p>
				<p id="Box123"><strong id="Box123">Content:</strong> {article.content}</p>
				<h4 id="Box123">Tags:</h4>
				{article.tags.map((tag) => {
					return ( <p id="Box123">{tag.name}</p> )
				})}
				<p><strong>Published:</strong> {new Date(article.createdAt).toDateString()}</p>

				<button onClick={() => removePage()}>Delete Page</button>
				<button onClick={() => setArticle('')} >Return to Wiki</button>
			</main>
			</>
		)
	} else if (isAddingArticle == true) {
		return (
			<>
				<main>
					<h1>WikiVerse Form</h1>
					<h2>Add a page</h2>
					<h4>Add Title</h4>
					<input type="text" placeholder="Enter Title" onChange = {(e) => setTitle(e.target.value)}/>
					<h4>Content</h4>
					<input type="text" placeholder="Enter Content" onChange = {(e) => setContent(e.target.value)}/>
					<h4>Author Name</h4>
					<input type="text" placeholder="Enter Author Name" onChange = {(e) => setName(e.target.value)}/>
					<h4>Email</h4>
					<input type="text" placeholder="Enter Email" onChange = {(e) => setEmail(e.target.value)}/>
					<h4>Tags:</h4>
					<input type="text" placeholder="Enter Tags" onChange = {(e) => setTags(e.target.value)}/>
					<br></br>
					<br></br>
					<button onClick={() => addPage()}>Submit Form</button>
					<button onClick={() => setIsAddingArticle(false)}>Back to Wiki</button>
				</main>
			</>
		)
	}
}