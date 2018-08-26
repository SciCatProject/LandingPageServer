import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const datasets = [
      {
        id: "11",
        name: "https://doi.org/10.17199/BRIGHTNESS/NMX0001",
        creator: "Dorothea Pfeiffer",
        affiliation: "ESS DG",
        title: "Sample data from NMX detector",
        abstract:
          "This data was collected as part of BrightnESS, funded by the European Union " +
          "Framework Programme for Research and Innovation Horizon 2020, under grant agreement 676548.  " +
          "It consists of test data for the NMX detector.",
        publisher: "ESS-DMSC",
        year: "2017",
        url: "https://doi.org/10.17199/BRIGHTNESS/NMX0001",
        download:
          "https://scicat.esss.se/dataset/10.17199%2FBRIGHTNESS%2FNMX0001",
        resource_type: "NeXus HDF5 file",
        size: 50,
        number_of_datasets: 26
      },
      {
        id: "12",
        name: "https://doi.org/10.17199/BRIGHTNESS/MG0002",
        creator: "Anton Khaplanov",
        affiliation: "ESS DG",
        title: "Sample data from Multigrid detector",
        abstract:
          "This data was collected as part of BrightnESS, funded by the European Union " +
          "Framework Programme for Research and Innovation Horizon 2020, under grant agreement 676548.  " +
          "It consists of test data for the Multigrid detector.",
        publisher: "ESS-DMSC",
        year: "2017",
        url: "https://doi.org/10.17199/BRIGHTNESS/MG0002",
        download:
          "https://scicat.esss.se/dataset/10.17199%2FBRIGHTNESS%2FMG0001",
        size: 50,
        number_of_datasets: 26,
        resource_type: "NeXus HDF5 file"
      },
      {
        id: "13",
        name: "https://doi.org/10.17199/BRIGHTNESS/MB0001",
        creator: "Francesco Piscitelli",
        affiliation: "ESS DG",
        title: "Sample data from Multiblade detector",
        abstract:
          "This data was collected as part of BrightnESS, funded by the European Union " +
          "Framework Programme for Research and Innovation Horizon 2020, under grant agreement 676548.  " +
          "It consists of test data for the Multiblade detector.",
        publisher: "ESS-DMSC",
        year: "2017",
        url: "https://doi.org/10.17199/BRIGHTNESS/MB0001",
        download:
          "https://scicat.esss.se/dataset/10.17199%2FBRIGHTNESS%2FMB0001",
        size: 50,
        number_of_datasets: 26,
        resource_type: "NeXus HDF5 file"
      },
      {
        id: "14",
        name: "https://doi.org/10.17199/BRIGHTNESS/SONDE0001",
        creator: "Ramsey Al Jebali",
        affiliation: "ESS DG",
        title: "Sample data from SONDE detector",
        abstract:
          "This data was collected as part of BrightnESS, funded by the European Union " +
          "Framework Programme for Research and Innovation Horizon 2020, under grant agreement 676548.  " +
          "It consists of test data for the SONDE detector.",
        publisher: "ESS-DMSC",
        year: "2017",
        url: "https://doi.org/10.17199/BRIGHTNESS/SONDE0001",
        download:
          "https://scicat.esss.se/dataset/10.17199%2FBRIGHTNESS%2FSONDE0001",
        size: 50,
        number_of_datasets: 26,
        resource_type: "NeXus HDF5 file"
      },
      {
        id: "15",
        name: "https://doi.org/10.17199/BRIGHTNESS/NMX0005",
        creator: "Dorothea Pfeiffer",
        affiliation: "ESS DG",
        title: "Vanadium sample data from NMX beam line",
        abstract:
          "This data was collected as part of BrightnESS, funded by the European Union " +
          "Framework Programme for Research and Innovation Horizon 2020, under grant agreement 676548.  " +
          "It consists of test data for the NMX detector.",
        publisher: "ESS-DMSC",
        year: "2017",
        url: "https://doi.org/10.17199/BRIGHTNESS/NMX0001",
        download:
          "https://scicat.esss.se/dataset/10.17199%2FBRIGHTNESS%2FNMX0001",
        size: 50,
        number_of_datasets: 26,
        resource_type: "NeXus HDF5 file"
      },
      {
        id: "16",
        name: "https://doi.org/10.17199/BRIGHTNESS/NMX0006",
        creator: "Dorothea Pfeiffer",
        affiliation: "ESS DG",
        title: "Vanadium sample data from NMX beam line",
        abstract:
          "This data was collected as part of BrightnESS, funded by the European Union " +
          "Framework Programme for Research and Innovation Horizon 2020, under grant agreement 676548.  " +
          "It consists of test data for the NMX detector.",
        publisher: "ESS-DMSC",
        year: "2017",
        url: "https://doi.org/10.17199/BRIGHTNESS/NMX0001",
        download:
          "https://scicat.esss.se/dataset/10.17199%2FBRIGHTNESS%2FMB0001",
        size: 50,
        number_of_datasets: 26,
        resource_type: "NeXus HDF5 file"
      },
      {
        id: "17",
        name: "https://doi.org/10.17199/BRIGHTNESS/NMX0007",
        creator: "Dorothea Pfeiffer",
        affiliation: "ESS DG",
        title: "Vanadium sample data from NMX beam line",
        abstract:
          "This data was collected as part of BrightnESS, funded by the European Union " +
          "Framework Programme for Research and Innovation Horizon 2020, under grant agreement 676548.  " +
          "It consists of test data for the NMX detector.",
        publisher: "ESS-DMSC",
        year: "2017",
        url: "https://doi.org/10.17199/BRIGHTNESS/NMX0001",
        download:
          "https://scicat.esss.se/dataset/10.17199%2FBRIGHTNESS%2FMB0001",
        size: 50,
        number_of_datasets: 26,
        resource_type: "NeXus HDF5 file"
      },
      {
        id: "18",
        name: "https://doi.org/10.17199/BRIGHTNESS/NMX0008",
        creator: "Dorothea Pfeiffer",
        affiliation: "ESS DG",
        title: "Vanadium sample data from NMX beam line",
        abstract:
          "This data was collected as part of BrightnESS, funded by the European Union " +
          "Framework Programme for Research and Innovation Horizon 2020, under grant agreement 676548.  " +
          "It consists of test data for the NMX detector.",
        publisher: "ESS-DMSC",
        year: "2017",
        url: "https://doi.org/10.17199/BRIGHTNESS/NMX0001",
        download:
          "https://scicat.esss.se/dataset/10.17199%2FBRIGHTNESS%2FMB0001",
        size: 50,
        number_of_datasets: 26,
        resource_type: "NeXus HDF5 file"
      },
      {
        id: "19",
        name: "https://doi.org/10.17199/BRIGHTNESS/NMX0009",
        creator: "Dorothea Pfeiffer",
        affiliation: "ESS Detector Group",
        title: "Vanadium sample data from NMX beam line",
        abstract:
          "This data was collected as part of BrightnESS, funded by the European Union " +
          "Framework Programme for Research and Innovation Horizon 2020, under grant agreement 676548.  " +
          "It consists of test data for the NMX detector.",
        publisher: "ESS-DMSC",
        year: "2017",
        url: "https://doi.org/10.17199/BRIGHTNESS/NMX0001",
        download:
          "https://scicat.esss.se/dataset/10.17199%2FBRIGHTNESS%2FMB0001",
        size: 50,
        number_of_datasets: 26,
        resource_type: "NeXus HDF5 file"
      },
      {
        id: "20",
        name: "https://doi.org/10.17199/BRIGHTNESS/NMX0010",
        creator: "Dorothea Pfeiffer",
        affiliation: "ESS DG",
        title: "Vanadium sample data from NMX beam line",
        abstract:
          "This data was collected as part of BrightnESS, funded by the European Union " +
          "Framework Programme for Research and Innovation Horizon 2020, under grant agreement 676548.  " +
          "It consists of test data for the NMX detector.",
        publisher: "ESS-DMSC",
        year: "2017",
        url: "https://doi.org/10.17199/BRIGHTNESS/NMX0001",
        download:
          "https://scicat.esss.se/dataset/10.17199%2FBRIGHTNESS%2FMB0001",
        size: 50,
        number_of_datasets: 26,
        resource_type: "NeXus HDF5 file"
      }
    ];
    return { datasets: datasets };
  }
}
