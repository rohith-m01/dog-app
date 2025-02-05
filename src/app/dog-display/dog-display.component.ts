import { Component } from '@angular/core';
import { DogService } from './dog-display.service';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dog-display',
  templateUrl: './dog-display.component.html',
  styleUrls: ['./dog-display.component.css']
})
export class DogDisplayComponent {

  breeds: any[] = [];         // Array to hold the breed data
  errorMessage: string = '';  // Error message holder

  public chartData: ChartData<'bar'> = {
    labels: [],  // Will hold dog names (X-axis)
    datasets: [
      {
        data: [],  // Will hold the maximum age values (Y-axis)
        label: 'Max Age (Years)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Bar color
        borderColor: 'rgba(75, 192, 192, 1)',  // Border color
        borderWidth: 1
      }
    ]
  };

  public chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Dog Breeds'  // X-axis title
        }
      },
      y: {
        title: {
          display: true,
          text: 'Max Age (Years)'  // Y-axis title
        },
      }
    }
  };


  constructor(private dogService: DogService) {}

  ngOnInit(): void {
    this.fetchDogBreeds();
    this.fetchChartsData();
  }

  // Fetch dog breeds from the Dog API
  fetchDogBreeds(): void {
    this.dogService.getDogBreeds().subscribe({
      next: (breeds) => {
        this.breeds = breeds;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load dog breeds.';
        console.error('Error fetching dog breeds', err);
      }
    });
  }

  fetchChartsData(){
    this.dogService.getDogBreeds().subscribe((breeds) => {
      const breedNames = breeds.map((breed: any) => breed.name);  // Get breed names
      const maxAges = breeds.map((breed: any) => breed.lifeMax);  // Get max ages

      // Set chart data
      this.chartData.labels = breedNames;
      this.chartData.datasets[0].data = maxAges;
    });
  }


}
