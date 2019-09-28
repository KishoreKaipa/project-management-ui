import {Pipe,PipeTransform} from '@angular/core';
import {User} from './user/user';
import {Project} from './project/project';
import {Task} from './task/task';
@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform{
    transform(items:any[],searchText:string):any[]
    {
        console.log('coming to filter');
        if(!items) return [];
        if(!searchText) return items;
        searchText=searchText.toLowerCase();
        console.log('coming to filter2');
        if(items[0] instanceof User)
        {
            return items.filter(it => 
                 { return (it.firstName.toLowerCase().includes(searchText) || it.lastName.toLowerCase().includes(searchText));
                 });
        
            }
        

        if(items[0] instanceof Project)
        {
            return items.filter(it => 
                 { return (it.projectDescription.toLowerCase().includes(searchText) ) ;
                 });
        
            }
            if(items[0] instanceof Task)
            {
                return items.filter(it => 
                     { return (it.taskDescription.toLowerCase().includes(searchText));
                     });
            
                }
        }

}