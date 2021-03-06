import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/x-www-form-urlencoded' })
};

@Injectable({
    providedIn: 'root'
  })
export class ApiService {

    constructor(private http:HttpClient) {
    }

    // NOTE: all API calls in this file use simple endpoints served by
    // an Express app in the file app.js in the repo root. See that file
    // for all back-end code.

    // Uses http.get() to load data from a single API endpoint
    getDoctors() {
        return this.http.get('https://healthmonitoring1200.herokuapp.com/getAllDoctor');
    }

    // Uses Observable.forkJoin() to run multiple concurrent http.get() requests.
    // The entire operation will result in an error state if any single request fails.
    // getBooksAndMovies() {
    //     return Observable.forkJoin(
    //     this.http.get('/api/books'),
    //     this.http.get('/api/movies')
    //     );
    // }

    // send a POST request to the API to create a new data object
    createDoctor(doctor) {
        let body = JSON.stringify(doctor);
        return this.http.post('/api/doctor/', body, httpOptions);
    }
    assignDoctor(doctor) {
        let body = JSON.stringify(doctor);
        return this.http.post('https://healthmonitoring1200.herokuapp.com/assignDoctor', body, httpOptions);
    }
    // send a PUT request to the API to update a data object
    updateDoctor(doctor) {
        let body = JSON.stringify(doctor);
        return this.http.put('/api/doctor/' + doctor.id, body, httpOptions);
    }

    // send a DELETE request to the API to delete a data object
    deleteDoctor(doctor) {
        let body = JSON.stringify(doctor);
        return this.http.post('https://healthmonitoring1200.herokuapp.com/deleteDoctor', body, httpOptions);
    }

}