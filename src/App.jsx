import { useState, useEffect } from "react";
import { ref, onValue, update } from "firebase/database";
import { db } from "./backend/firebaseConfig";
import CustomButton from "./components/customButton";

function App() {
  const [tackerData, setTackerData] = useState({
    isLocked: false,
    lat: 0,
    lng: 0,
  });
  const [isTracking, setIsTracking] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  function startTracking() {
    setIsTracking(!isTracking);
    setAlertMessage(""); // Clear alert when starting/stopping tracking
  }

  function lockDevice() {
    if (!isTracking) {
      setAlertMessage("Please start tracking before locking the device.");
      return;
    } else if (tackerData.isLocked === true) {
      setAlertMessage("Device is already locked.");
      return;
    }
    setAlertMessage("Successfully locked the device."); // Clear alert if successful

    const updates = {};
    updates["trackers/esp32_1/isLocked"] = true; // database path to update

    return update(ref(db), updates);
  }

  function unlockDevice() {
    if (!isTracking) {
      setAlertMessage("Please start tracking before unlocking the device.");
      return;
    } else if (tackerData.isLocked === false) {
      setAlertMessage("Device is already unlocked.");
      return;
    }
    setAlertMessage("Successfully unlocked the device."); // Clear alert if successful

    const updates = {};
    updates["trackers/esp32_1/isLocked"] = false; // database path to update

    return update(ref(db), updates);
  }

  useEffect(() => {
    if (!isTracking) return; // Don't start listener until tracking is enabled

    const tackerRef = ref(db, "trackers/esp32_1");

    const unsubscribe = onValue(tackerRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Firebase data received:", data); // Debug log
      if (data) {
        setTackerData({
          isLocked: data.isLocked || false,
          lng: data.lng || 0,
          lat: data.lat || 0,
        });
        console.log("Updated trackerData:", {
          // Debug log
          isLocked: data.isLocked || false,
          lng: data.lng || 0,
          lat: data.lat || 0,
        });
      } else {
        console.log("No data received from Firebase");
      }
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => unsubscribe();
  }, [isTracking]); // Add isTracking as dependency

  return (
    <div className="flex items-center justify-center h-screen bg-radial from-[#020024] from-30% to-[#016D95] to-100% ">
      <div className="space-y-2">
        <h1 className="text-white text-4xl mb-6 text-center">Device Tracker</h1>
        <div className="space-y-2 bg-[#dbdbdb] p-6 rounded-[7px] max-w-sm place-self-center">
          <div className="flex justify-center space-x-4">
            <CustomButton
              label={isTracking ? "Untrack" : "Track"}
              handleClick={startTracking}
              tooltip={"Start or stop tracking the device"}
            />
            <CustomButton
              label={"Lock"}
              handleClick={lockDevice}
              tooltip={"Lock the device"}
            />
            <CustomButton
              label={"Unlock"}
              handleClick={unlockDevice}
              tooltip={"Unlock the device"}
            />
          </div>

          {alertMessage.startsWith("Please") ? (
            <div
              className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-3 mt-4"
              role="alert"
            >
              <p>
                <span className="font-bold">Alert:</span> {alertMessage}
              </p>
            </div>
          ) : alertMessage.startsWith("Device") ? (
            <div
              className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3 mt-4"
              role="alert"
            >
              <p>
                <span className="font-bold">Info:</span> {alertMessage}
              </p>
            </div>
          ) : alertMessage.startsWith("Successfully") ?(
            <div
              className="bg-teal-100 border-l-4 border-teal-500 text-teal-900 p-3 mt-4"
              role="alert"
            >
              <p>
                <span className="font-bold">Success:</span> {alertMessage}
              </p>
            </div>
          ) : null}
        </div>

          {/* bg-teal-100 border-teal-500 text-teal-900 */}

        <article className="bg-[#dbdbdb] p-6 rounded-[7px]">
          {!isTracking ? (
            <p className="text-lg text-gray-500 text-center">
              Click "Track" to start monitoring the device
            </p>
          ) : (
            <>
              <p className="text-lg">
                Location:
                {tackerData.lat !== 0 && tackerData.lng !== 0 ? (
                  <a
                    href={`https://maps.google.com/?q=${tackerData.lat},${tackerData.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline ml-2"
                  >
                    View on Google Maps
                  </a>
                ) : (
                  "No location data"
                )}
              </p>
              <p className="text-lg">Longitude: {tackerData.lng}</p>
              <p className="text-lg">Latitude: {tackerData.lat}</p>
              <p className="text-lg">
                Status: {tackerData.isLocked ? "🔒 Locked" : "🔓 Unlocked"}
              </p>
            </>
          )}
        </article>
      </div>
    </div>
  );
}

export default App;
