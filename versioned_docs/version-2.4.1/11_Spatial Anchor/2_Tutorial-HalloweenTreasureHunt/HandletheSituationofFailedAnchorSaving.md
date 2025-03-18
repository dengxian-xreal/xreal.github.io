# Handle the Situation of Failed Anchor Saving

The following three scripts are included in the NRSDK. However, to implement the  ["Halloween Treasure Hunt" tutorial](../2_Tutorial-HalloweenTreasureHunt/Intro.md), we need to make some modifications. Specifically, to handle the potential confusion caused by the possible failure of anchor saving, we will obtain callbacks for both successful and failed saves, and provide users with appropriate prompts. The modifications made to these scripts to achieve this are provided below. Please copy them directly and replace the original script content.



import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="Anchorltems.cs" label="Anchorltems.cs" default>
      ```
      /****************************************************************************
      * Copyright 2019 XREAL Techonology Limited. All rights reserved.
      *                                                                                                                                                          
      * This file is part of NRSDK.                                                                                                          
      *                                                                                                                                                           
      * https://www.xreal.com/        
      * 
      *****************************************************************************/

      namespace NRKernal.Persistence
      {
          using System;
          using UnityEngine;
          using UnityEngine.EventSystems;
          using UnityEngine.UI;

          /// <summary> An anchor item. </summary>
          public class AnchorItem : MonoBehaviour, IPointerClickHandler
          {

              public ScoreManager scoreManager; 

              public GameObject failedPanel;  // Private variables are used to store references to panels.

              public Button saveButton;  

              /// <summary> The key. </summary>
              public string key;
              /// <summary> The on anchor item click. </summary>
              public Action<string, GameObject> OnAnchorItemClick;
              /// <summary> The anchor panel. </summary>
              [SerializeField]
              private GameObject canvas;
              [SerializeField]
              private Text anchorUUID;

              private NRWorldAnchor m_NRWorldAnchor;
              private Material m_Material;


              void Start()
              {
                  if (TryGetComponent(out m_NRWorldAnchor))
                  {
                      if (canvas != null)
                          canvas.SetActive(true);
                      if (anchorUUID != null)
                          anchorUUID.text = m_NRWorldAnchor.UUID;
                      m_Material = GetComponentInChildren<Renderer>()?.material;
                      if (m_Material != null)
                      {
                          m_NRWorldAnchor.OnTrackingChanged += (NRWorldAnchor worldAnchor, TrackingState state) =>
                          {
                              switch (state)
                              {
                                  case TrackingState.Tracking:
                                      // m_Material.color = Color.green;
                                      UnityEngine.Debug.Log("Successfully found the treasure");
                                      scoreManager.AddScore(1);
                                      break;
                                  case TrackingState.Paused:
                                      m_Material.color = Color.white;
                                      break;
                                  case TrackingState.Stopped:
                                      m_Material.color = Color.red;
                                      break;
                              }
                          };
                      }
                  }
              }

              public void Save()
              {
                  if (m_NRWorldAnchor != null)
                  {
                      
                      m_NRWorldAnchor.SaveAnchor(success =>
                      {
                          if (success)
                          {
                              Debug.Log("Anchor saved successfully!");
                              saveButton.image.color = Color.green;
                          }
                          else
                          {
                              Debug.LogError("Failed to save anchor!");
                              failedPanel.SetActive(true);
                              saveButton.image.color = Color.red;
                          }
                      });
                      
                  }
                    
              }

              public void Erase()
              {
                  if (m_NRWorldAnchor != null)
                      m_NRWorldAnchor.EraseAnchor();
              }

              public void Destory()
              {
                  if (m_NRWorldAnchor != null)
                      m_NRWorldAnchor.DestroyAnchor();
              }

              public void OnPointerClick(PointerEventData eventData)
              {
                  OnAnchorItemClick?.Invoke(key, gameObject);
              }
            
          }
      }
    ```
  </TabItem>
  <TabItem value="NRWorldAnchor.cs" label="NRWorldAnchor.cs">
    ```
    /****************************************************************************
    * Copyright 2019 XREAL Techonology Limited. All rights reserved.
    *                                                                                                                                                          
    * This file is part of NRSDK.                                                                                                          
    *                                                                                                                                                           
    * https://www.xreal.com/        
    * 
    *****************************************************************************/

    namespace NRKernal.Persistence
    {
        using System;
        using UnityEngine;
        using UnityEngine.EventSystems;
        using UnityEngine.UI;

        /// <summary> An anchor item. </summary>
        public class AnchorItem : MonoBehaviour, IPointerClickHandler
        {

            public ScoreManager scoreManager; 

            public GameObject failedPanel;  // Private variables are used to store references to panels.

            public Button saveButton;  

            /// <summary> The key. </summary>
            public string key;
            /// <summary> The on anchor item click. </summary>
            public Action<string, GameObject> OnAnchorItemClick;
            /// <summary> The anchor panel. </summary>
            [SerializeField]
            private GameObject canvas;
            [SerializeField]
            private Text anchorUUID;

            private NRWorldAnchor m_NRWorldAnchor;
            private Material m_Material;


            void Start()
            {
                if (TryGetComponent(out m_NRWorldAnchor))
                {
                    if (canvas != null)
                        canvas.SetActive(true);
                    if (anchorUUID != null)
                        anchorUUID.text = m_NRWorldAnchor.UUID;
                    m_Material = GetComponentInChildren<Renderer>()?.material;
                    if (m_Material != null)
                    {
                        m_NRWorldAnchor.OnTrackingChanged += (NRWorldAnchor worldAnchor, TrackingState state) =>
                        {
                            switch (state)
                            {
                                case TrackingState.Tracking:
                                    // m_Material.color = Color.green;
                                    UnityEngine.Debug.Log("Successfully found the treasure");
                                    scoreManager.AddScore(1);
                                    break;
                                case TrackingState.Paused:
                                    m_Material.color = Color.white;
                                    break;
                                case TrackingState.Stopped:
                                    m_Material.color = Color.red;
                                    break;
                            }
                        };
                    }
                }
            }

            public void Save()
            {
                if (m_NRWorldAnchor != null)
                {
                    
                    m_NRWorldAnchor.SaveAnchor(success =>
                    {
                        if (success)
                        {
                            Debug.Log("Anchor saved successfully!");
                            saveButton.image.color = Color.green;
                        }
                        else
                        {
                            Debug.LogError("Failed to save anchor!");
                            failedPanel.SetActive(true);
                            saveButton.image.color = Color.red;
                        }
                    });
                    
                }
                  
            }

            public void Erase()
            {
                if (m_NRWorldAnchor != null)
                    m_NRWorldAnchor.EraseAnchor();
            }

            public void Destory()
            {
                if (m_NRWorldAnchor != null)
                    m_NRWorldAnchor.DestroyAnchor();
            }

            public void OnPointerClick(PointerEventData eventData)
            {
                OnAnchorItemClick?.Invoke(key, gameObject);
            }
          
        }
    }

    ```
  </TabItem>
  <TabItem value="NRWorldAnchorStore.cs" label="NRWorldAnchorStore.cs">
  ```
  /****************************************************************************
  * Copyright 2019 XREAL Techonology Limited. All rights reserved.
  *                                                                                                                                                          
  * This file is part of NRSDK.                                                                                                          
  *                                                                                                                                                           
  * https://www.xreal.com/        
  * 
  *****************************************************************************/

  namespace NRKernal.Persistence
  {
      using System;
      using System.Collections.Generic;
      using System.IO;
      using System.Linq;
      using System.Threading;
      using UnityEngine;
    using System.Threading.Tasks;

      /// <summary> NR world anchor store. </summary>
      public class NRWorldAnchorStore : IDisposable
      {
          /// <summary> The native mapping. </summary>
          private NativeMapping m_NativeMapping;
          /// <summary> Dictionary of anchors. </summary>
          private Dictionary<UInt64, NRWorldAnchor> m_AnchorDict = new Dictionary<UInt64, NRWorldAnchor>();
          /// <summary> Dictionary of anchor uuid and UserDefinedKey. </summary>
          private Dictionary<string, string> m_Anchor2ObjectDict = new Dictionary<string, string>();
          public static NRWorldAnchorStore Instance;

          /// <summary> Pathname of the map folder. </summary>
          public const string MapFolder = "XREALMaps";
          public readonly string MapPath;
          /// <summary> The anchor 2 object file. </summary>
          public const string Anchor2ObjectFile = "anchor2object.json";

          private bool saveStatus;
        // private AliyunOSSManager ossManager;
      

          /// <summary> Default constructor. </summary>
          internal NRWorldAnchorStore()
          {
  #if !UNITY_EDITOR
              m_NativeMapping = new NativeMapping(NRSessionManager.Instance.NativeAPI);
  #endif
              Instance = this;
              MapPath =
  #if UNITY_EDITOR
                  Path.Combine(Directory.GetCurrentDirectory(), MapFolder);
  #else
                  Path.Combine(Application.persistentDataPath, MapFolder);
  #endif
              if (!Directory.Exists(MapPath))
                  Directory.CreateDirectory(MapPath);
              string path = Path.Combine(MapPath, Anchor2ObjectFile);
              if (File.Exists(path))
              {
                  string json = File.ReadAllText(path);
                  NRDebugger.Info("[NRWorldAnchorStore] Anchor2Object json: {0}", json);
                  m_Anchor2ObjectDict = LitJson.JsonMapper.ToObject<Dictionary<string, string>>(json);
                  for (int i = 0; i < m_Anchor2ObjectDict.Count;)
                  {
                      var item = m_Anchor2ObjectDict.ElementAt(i).Key;
                      if (File.Exists(Path.Combine(MapPath, item)))
                          i++;
                      else
                          m_Anchor2ObjectDict.Remove(item);
                  }
              }
              //ossManager = new AliyunOSSManager();
        
        //storageManager.storageBasePath = "gs://nrsdk-63305.appspot.com";
              NRKernalUpdater.OnUpdate += OnUpdate;
          }

          /// <summary> Cleans up the WorldAnchorStore and releases memory. </summary>
          public void Dispose()
          {
              m_NativeMapping = null;
              NRKernalUpdater.OnUpdate -= OnUpdate;
          }

          /// <summary> Executes the 'update' action. </summary>
          private void OnUpdate()
          {
  #if !UNITY_EDITOR
              var listhandle = m_NativeMapping.CreateAnchorList();
              m_NativeMapping.UpdateAnchor(listhandle);
              var size = m_NativeMapping.GetAnchorListSize(listhandle);
              for (int i = 0; i < size; i++)
              {
                  var anchorhandle = m_NativeMapping.AcquireItem(listhandle, i);
                  if (m_AnchorDict.ContainsKey(anchorhandle))
                  {
                      m_AnchorDict[anchorhandle].CurrentTrackingState = m_NativeMapping.GetTrackingState(anchorhandle);
                      if (m_AnchorDict[anchorhandle].CurrentTrackingState == TrackingState.Tracking)
                      {
                          Pose pose = ConversionUtility.ApiWorldToUnityWorld(m_NativeMapping.GetAnchorPose(anchorhandle));
                          m_AnchorDict[anchorhandle].UpdatePose(pose);
                      }
                  }
              }
              m_NativeMapping.DestroyAnchorList(listhandle);
  #endif
          }

          /// <summary> Creates an NRWorldAnchor. </summary>
          /// <param name="anchor"> The NRWorldAnchor handler.</param>
          /// <returns> The new anchor. </returns>
          public bool CreateAnchor(NRWorldAnchor anchor)
          {
              NRDebugger.Info("[NRWorldAnchorStore] Create a new NRWorldAnchor handle");
              Pose pose = new Pose(anchor.transform.position, anchor.transform.rotation);
              UInt64 handle = 0;
  #if UNITY_EDITOR
              handle = (ulong)UnityEngine.Random.Range(1, int.MaxValue);
  #else
              handle = m_NativeMapping.AddAnchor(pose);
  #endif
              if (handle == 0)
                  return false;
  #if UNITY_EDITOR
              anchor.UUID = Guid.NewGuid().ToString();
  #else
              anchor.UUID = m_NativeMapping.GetAnchorUUID(handle);
  #endif
              anchor.AnchorHandle = handle;
              m_AnchorDict[handle] = anchor;

              return true;
          }

          public void BindAnchor(NRWorldAnchor anchor, UInt64 handle)
          {
              anchor.AnchorHandle = handle;
              m_AnchorDict[handle] = anchor;
          }

      public delegate void SaveAnchorCallback(bool success);

          /// <summary>
          /// Saves the provided NRWorldAnchor with the UserDefinedKey. If the identifier is already
          /// in use, the method will return false. </summary>
          /// <param name="anchor"> .</param>
          /// <returns> True if it succeeds, false if it fails. </returns>
          public void SaveAnchor(NRWorldAnchor anchor, SaveAnchorCallback callback)
          {
              NRDebugger.Info("[NRWorldAnchorStore] Save Anchor: {0}", anchor.UserDefinedKey);
              if (m_Anchor2ObjectDict.ContainsKey(anchor.UUID))
              {
                  NRDebugger.Warning("[NRWorldAnchorStore] Save a new anchor that has already been saved.");
                  callback?.Invoke(false);
              }

              try
              {
                  m_Anchor2ObjectDict.Add(anchor.UUID, anchor.UserDefinedKey);
                  string json = LitJson.JsonMapper.ToJson(m_Anchor2ObjectDict);
                  string path = Path.Combine(MapPath, Anchor2ObjectFile);
                  NRDebugger.Info("[NRWorldAnchorStore] Save to the path:" + path + " json:" + json);
                  File.WriteAllText(path, json);
                  AsyncTaskExecuter.Instance.RunAction(() =>
                  {
                      bool success = true;
  #if UNITY_EDITOR
                      Thread.Sleep(1000);
                      File.Create(Path.Combine(MapPath, anchor.UUID)).Dispose();
  #else
                      success = m_NativeMapping.SaveAnchor(anchor.AnchorHandle, Path.Combine(MapPath, anchor.UUID));
  #endif
                      if (!success)
                      {
                          MainThreadDispather.QueueOnMainThread(() =>
                          {
                              NRDebugger.Info("[NRWorldAnchorStore] Save Anchor failed.");
                              m_Anchor2ObjectDict.Remove(anchor.UUID);
                              saveStatus = false;
            callback?.Invoke(false);
                          });
                      }
                      else
                      {
        callback?.Invoke(true);
        UnityEngine.Debug.Log("[NRWorldAnchorStore] Save Anchor successfully");
                          saveStatus = true;
        bool result=File.Exists(Path.Combine(MapPath, anchor.UUID));
        if(!result)
        {
          
          Debug.LogError($"File {Path.Combine(MapPath, anchor.UUID)} does not exist!");
        }
        else{
          Debug.Log($"File {Path.Combine(MapPath, anchor.UUID)} exist!");
        }
                      }
                  });
              }
              catch (Exception e)
              {
                  NRDebugger.Warning("[NRWorldAnchorStore] Write anchor to object dict exception:" + e.ToString());
                  callback?.Invoke(false);
              }
          }

          public const string CloudAnchor2ObjectFile = "cloud_anchor2object.json";
        /// <summary>save an anchor to aliyun cloud server</summary>
          public async Task<bool> CloudSaveAnchor(NRWorldAnchor anchor)
          {
              NRDebugger.Info("[NRWorldAnchorStore] Cloud save Anchor: {0}", anchor.UserDefinedKey);

              string localFilename = Path.Combine(MapPath, anchor.UUID);
              Debug.LogError("UploadFile: "+localFilename);
              NRDebugger.Info("[NRWorldAnchorStore] UploadFile:" + localFilename);
              //ossManager.UploadFile(anchor.UUID, localFilename);
        FirebaseStorageManager storageManager = FirebaseStorageManager.Instance;
        await storageManager.UploadFile(anchor.UUID, localFilename);

              // Save the dictionary to a JSON file
              string json = LitJson.JsonMapper.ToJson(m_Anchor2ObjectDict);
              string path = Path.Combine(MapPath, CloudAnchor2ObjectFile);
              NRDebugger.Info("[NRWorldAnchorStore] Save to the path for next upload:" + path + " json:" + json);
              File.WriteAllText(path, json);

              // Upload the JSON file to the cloud
              //ossManager.UploadFile(CloudAnchor2ObjectFile, path);
        await storageManager.UploadFile(CloudAnchor2ObjectFile, path);

              return true;
          }

          public bool GetSaveStatus()
          {
              if (Instance == null)
              {
                  Debug.LogError("NRWorldAnchorStore instance is null!");
              }
              return saveStatus;
          }

          public void SetAnchor2ObjectDict(Dictionary<string, string> newDict)
          {
              foreach (var item in newDict)
              {
                  if (!m_Anchor2ObjectDict.ContainsKey(item.Key))
                  {
                      m_Anchor2ObjectDict.Add(item.Key, item.Value);
                  }
              }
          }



          /// <summary> Saves all NRWorldAnchor. </summary>
          /// <returns> True if it succeeds, false if it fails. </returns>
          public void SaveAllAnchors(Action<bool> callback)
          {
              NRDebugger.Info("[NRWorldAnchorStore] Save all worldanchors: {0}.", m_AnchorDict.Count);
              int successCount = 0;
              int totalCount = m_AnchorDict.Values.Count;
          
              foreach (var item in m_AnchorDict.Values)
              {
                  if (!m_Anchor2ObjectDict.ContainsKey(item.UUID))
                  {
                      SaveAnchor(item, success =>
                      {
                          if (success)
                          {
                              NRDebugger.Info("[NRWorldAnchorStore] Successfully save anchor : {0}.", item.UUID);
                              successCount++;
                          }
                          else
                          {
                              NRDebugger.Info("[NRWorldAnchorStore] Failed to save anchor: {0}.", item.UUID);
                          }
          
                          // 检查是否所有保存操作都已完成
                          if (successCount + totalCount - successCount == totalCount)
                          {
                              callback(successCount == totalCount); // 如果所有操作都成功，则调用回调并传递true
                          }
                      });
                  }
              }
          }


          /// <summary> Destroy a NRWorldAnchor from the store. </summary>
          /// <param name="key"> .</param>
          /// <returns> True if it succeeds, false if it fails. </returns>
          public bool DestroyAnchor(NRWorldAnchor anchor)
          {
              NRDebugger.Info("[NRWorldAnchorStore] Destroy Anchor {0}.", anchor.UUID);

              if (m_AnchorDict.ContainsKey(anchor.AnchorHandle))
              {
                  m_AnchorDict.Remove(anchor.AnchorHandle);
              }
  #if !UNITY_EDITOR
              AsyncTaskExecuter.Instance.RunAction(() =>
                  {
                      m_NativeMapping.DestroyAnchor(anchor.AnchorHandle);
                  }
              );
  #endif
              GameObject.Destroy(anchor.gameObject);
              return true;
          }

          /// <summary> Clear all NRWorldAnchors. </summary>
          public void Destroy()
          {
              NRDebugger.Info("[NRWorldAnchorStore] Destroy all worldanchors: {0}.", m_AnchorDict.Count);
              foreach (var item in m_AnchorDict)
              {
  #if !UNITY_EDITOR
                  var key = item.Key;
                  AsyncTaskExecuter.Instance.RunAction(() =>
                      {
                          m_NativeMapping.DestroyAnchor(key);
                      }
                  );
  #endif
                  GameObject.Destroy(item.Value.gameObject);
              }
              m_AnchorDict.Clear();
          }

          /// <summary> Erase a NRWorldAnchor from disk </summary>
          /// <returns> True if it succeeds, false if it fails. </returns>
          public bool EraseAnchor(NRWorldAnchor anchor)
          {
              NRDebugger.Info("[NRWorldAnchorStore] Erase Anchor: {0}.", anchor.UUID);
              if (m_Anchor2ObjectDict.ContainsKey(anchor.UUID))
                  m_Anchor2ObjectDict.Remove(anchor.UUID);

              string path = Path.Combine(MapPath, anchor.UUID);
              if (File.Exists(path))
              {
                  File.Delete(path);
                  return true;
              }
              return false;
          }

          /// <summary> Loads a NRWorldAnchor from disk for given identifier.</summary>
          /// <param name="uuid"> anchor uuid .</param>
          /// <param name="action"> Execute in main thread after success load.</param>
          public void LoadwithUUID(string uuid, Action<UInt64> action)
          {
              if (m_Anchor2ObjectDict.ContainsKey(uuid))
              {
                  string path = Path.Combine(MapPath, uuid);
                  if (File.Exists(path))
                  {
                      AsyncTaskExecuter.Instance.RunAction(() =>
                      {
                          UInt64 handle = 0;
  #if UNITY_EDITOR
                          handle = (ulong)UnityEngine.Random.Range(1, int.MaxValue);
  #else
                          handle = m_NativeMapping.LoadAnchor(path);
  #endif
                          MainThreadDispather.QueueOnMainThread(() =>
                          {
                              if (handle == 0)
                              {
                                  NRDebugger.Info("[NRWorldAnchorStore] Load Anchor failed: {0}.", uuid);
                                  m_Anchor2ObjectDict.Remove(uuid);
                              }
                              else
                                  action?.Invoke(handle);
                          });
                      });
                  }
              }
          }

          public Dictionary<string, string> GetLoadableAnchorUUID()
          {
              var existingUUID = m_AnchorDict.Select(x => x.Value.UUID).ToList();
              return m_Anchor2ObjectDict.Where(x =>!existingUUID.Contains(x.Key))
                  .ToDictionary(kvp => kvp.Key, kvp => kvp.Value);
          }
      }
  }
    ```
  </TabItem>
</Tabs>
