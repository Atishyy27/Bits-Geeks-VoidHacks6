import 'dart:math';
import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';

class LocationServices extends StatefulWidget {
  const LocationServices({super.key});

  @override
  State<LocationServices> createState() => _LocationServices();
}

class _LocationServices extends State<LocationServices> {
  String _locationMessage = "Press the button to get the location.";

  getCurrentLocation() async {
    try {
      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied ||
          permission == LocationPermission.deniedForever) {
        setState(() {
          _locationMessage = "Location Denied!!";
        });
        // Request permission
        await Geolocator.requestPermission();
      } else {
        Position currentPosition = await Geolocator.getCurrentPosition(
          locationSettings: LocationSettings(
            accuracy: LocationAccuracy.best,
            distanceFilter: 10,
          ),
        );
        setState(() {
          _locationMessage =
              "Latitude: ${currentPosition.latitude}\nLongitude: ${currentPosition.longitude}";
        });
      }
    } catch (e) {
      setState(() {
        _locationMessage = "Error fetching location: $e";
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("InternHuub"),
        centerTitle: true,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {
                getCurrentLocation();
              },
              child: Text("Send Location Co-ordinates to Mentor."),
            ),
            SizedBox(height: 20),
            Text(_locationMessage, textAlign: TextAlign.center),
          ],
        ),
      ),
    );
  }
}
