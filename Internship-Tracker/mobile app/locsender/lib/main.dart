import 'package:flutter/material.dart';
import 'package:location/location.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: LocationScreen(),
    );
  }
}

class LocationScreen extends StatefulWidget {
  @override
  _LocationScreenState createState() => _LocationScreenState();
}

class _LocationScreenState extends State<LocationScreen> {
  Location location = Location();
  bool _isLocationServiceEnabled = false;
  PermissionStatus _permissionStatus = PermissionStatus.denied;
  String _locationMessage = "Press the button to get the location";

  @override
  void initState() {
    super.initState();
    _checkPermission();
  }

  // Check location permissions
  Future<void> _checkPermission() async {
    // Request permission for location access
    PermissionStatus permission = await Permission.location.request();
    setState(() {
      _permissionStatus = permission;
    });
  }

  // Get location and send to the server
  Future<void> _getLocation() async {
    if (_permissionStatus != PermissionStatus.granted) {
      // If permissions are not granted
      setState(() {
        _locationMessage = "Permission Denied!";
      });
      return;
    }

    if (await location.serviceEnabled()) {
      // Get the location
      LocationData locationData = await location.getLocation();
      setState(() {
        _locationMessage =
            "Latitude: ${locationData.latitude}, Longitude: ${locationData.longitude}";
      });

      // You can now send this location data to your server
      _sendLocationToServer(locationData.latitude, locationData.longitude);
    } else {
      setState(() {
        _locationMessage = "Location services are disabled.";
      });
    }
  }

  // Send location to the server (This is an example)
  Future<void> _sendLocationToServer(
      double? latitude, double? longitude) async {
    final serverUrl = 'https://your-server-url.com/api/send_location';

    try {
      var response = await http.post(
        Uri.parse(serverUrl),
        body: {
          'latitude': latitude.toString(),
          'longitude': longitude.toString(),
        },
      );

      if (response.statusCode == 200) {
        print('Location sent successfully!');
      } else {
        print('Failed to send location');
      }
    } catch (e) {
      print('Error sending location: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Location Sender")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              onPressed: _getLocation,
              child: Text('Send My Location'),
            ),
            SizedBox(height: 20),
            Text(_locationMessage),
          ],
        ),
      ),
    );
  }
}
