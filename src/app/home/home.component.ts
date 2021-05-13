import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { element } from 'protractor';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public film : any = {};
  searchForm :FormGroup
  public favorite : Boolean = false;
  public rate = 0;
  public error : Boolean = false;
  public count :any;
  public favorites : any[] = []
  public errorMessage : any;
  constructor( private http : ApiService, private formBuilder : FormBuilder) { 
    this.searchForm = this.formBuilder.group({
      search: new FormControl('', Validators.required),
     
    }); 
  }

  ngOnInit(): void {
    this.error = true;
    if(localStorage.getItem("favorites")){
      var arrayFavorite = JSON.parse(localStorage.getItem("favorites") || '{}');
      arrayFavorite.forEach((favorite:any )=> {
        this.favorites.push(favorite)
      });
    }
  }
  async search(){
  
    if (!this.searchForm.invalid) {
      this.http.get({t:this.searchForm.value.search, plot:"full", y: "full"}).subscribe(
        async (response: any) => {
          console.log(response)
          if(!response.Error){
            this.film = response
            this.error = false;
            console.log(this.error);
            this.count =0; 
            this.rate = 0;

            this.film.Ratings.forEach ((element : any) => {
                if(element.Value.includes("%")){
                  element.Value = element.Value[0] / 100;
                }else{
                  element.Value = element.Value[0].split("/", 1)
                }
                this.rate += parseFloat(element.Value);
                this.count++
            });

            this.rate = this.rate / this.count;
           
            this.checkFavorite(this.film.Title);
  
          }else{
            this.error = true;
            this.errorMessage= response.Error;
          }
        }
      )
    }
     
  }
  reset(){
    this.searchForm.reset();
    this.film = {}
    this.error = true;
    this.errorMessage = false;
  }
  like(film_like: any){
    if(!this.favorite){
      this.favorite = true;
      
       this.favorites.push(film_like);
       
    }else{
      this.favorite = false;
      this.favorites.forEach( (item, index) => {
        if(item === film_like) this.favorites.splice(index,1);
      });
    }
    localStorage.setItem("favorites", JSON.stringify(this.favorites))
  }

  checkFavorite(name: any){
    if(this.favorites.includes(name)){
      this.favorite = true;
    }else{
      this.favorite = false;
    }
  }


}
