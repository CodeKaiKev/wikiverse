import React from 'react';
import { Page } from './Page';

export const PagesList = ({pages, wikiHandler}) => {
	return <>
		{
			pages.map((page, idx) => {
				
				return (
					<>
					<a id='wiki' onClick={() => wikiHandler(idx)}>
					<Page page={page} key={idx}/>
					</a>
				</>
				)
			})
		}
	</>
} 
//<Page page={page} key={idx} />