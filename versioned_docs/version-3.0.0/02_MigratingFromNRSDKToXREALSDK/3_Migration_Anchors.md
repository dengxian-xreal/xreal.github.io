# Migrating Anchors⚠️待完善share anchor部分

This guide focuses on migrating anchor functionality from NRSDK to XREAL SDK.

## Understanding the Differences

### NRSDK Anchor System
NRSDK 提供了两种类型的锚点：
1. **NRAnchor**
   - 用于跟踪可追踪对象（Trackable）的位置
   - 每帧自动更新位置
   - 主要用于临时性的空间定位

2. **NRWorldAnchor**
   - 用于在物理空间中固定对象位置
   - 支持持久化存储（保存/加载）
   - 包含 UUID 用于跨会话识别
   - 提供追踪状态变化事件

### AR Foundation Anchor System
AR Foundation 使用统一的 ARAnchorManager 来管理锚点：
- 提供统一的 ARAnchor 组件
- 支持创建、更新和删除锚点
- 可以将锚点附加到平面上
- 通过事件系统通知锚点变化

## Migration Steps

### 1. Remove NRSDK Anchor Components
- 移除 LocalMapExample 脚本
- 移除所有 NRWorldAnchor 组件
- 移除所有 NRAnchor 组件
- 保留需要复用的锚点预制体

### 2. Add AR Foundation Components
1. 在 XR Origin 上添加 ARAnchorManager
   ```csharp
   var anchorManager = xrOrigin.gameObject.AddComponent<ARAnchorManager>();
   ```

2. 配置 Anchor Prefab
   - 可以复用现有的锚点预制体
   - 确保预制体上有 ARAnchor 组件
   - 在 ARAnchorManager 的 Inspector 中设置 "Anchor Prefab"

### 3. Code Migration

#### Old NRSDK Code (LocalMapExample)
```csharp
public class LocalMapExample : MonoBehaviour
{
    private NRWorldAnchorStore m_NRWorldAnchorStore;

    public void AddAnchor()
    {
        var go = Instantiate(prefab);
        NRWorldAnchor anchor = go.AddComponent<NRWorldAnchor>();
        anchor.UserDefinedKey = key;
        bool success = anchor.CreateAnchor();
    }

    public void Save()
    {
        m_NRWorldAnchorStore.SaveAllAnchors();
    }

    public void Load()
    {
        var list = m_NRWorldAnchorStore.GetLoadableAnchorUUID();
        foreach (var item in list)
        {
            m_NRWorldAnchorStore.LoadwithUUID(item.Key, (handle) => {
                // Handle anchor loading
            });
        }
    }
}
```

#### Migration to AR Foundation
```csharp
using UnityEngine;
using UnityEngine.XR.ARFoundation;

public class AnchorManager : MonoBehaviour
{
    private ARAnchorManager m_AnchorManager;

    void Awake()
    {
        m_AnchorManager = GetComponent<ARAnchorManager>();
    }

    void OnEnable()
    {
        m_AnchorManager.anchorsChanged += OnAnchorsChanged;
    }

    void OnDisable()
    {
        m_AnchorManager.anchorsChanged -= OnAnchorsChanged;
    }

    public void AddAnchor(Vector3 position, Quaternion rotation)
    {
        var pose = new Pose(position, rotation);
        var anchor = m_AnchorManager.AddAnchor(pose);
    }

    private void OnAnchorsChanged(ARAnchorsChangedEventArgs args)
    {
        foreach (var anchor in args.added)
        {
            // 处理新添加的锚点
        }

        foreach (var anchor in args.updated)
        {
            // 处理更新的锚点
        }

        foreach (var anchor in args.removed)
        {
            // 处理移除的锚点
        }
    }
}
```

主要区别：
- NRSDK 需要手动管理锚点的创建和生命周期
- AR Foundation 通过 ARAnchorManager 自动管理锚点
- NRSDK 使用 NRWorldAnchorStore 进行持久化，AR Foundation 需要自行实现持久化逻辑
- AR Foundation 提供更完整的锚点生命周期管理（添加、更新、移除）

### 4. Anchor Properties Migration

| NRSDK Property/Method | AR Foundation Equivalent | Description |
|----------------------|-------------------------|-------------|
| anchor.UUID | anchor.trackableId | 锚点唯一标识符 |
| anchor.CurrentTrackingState | anchor.trackingState | 追踪状态 |
| anchor.CreateAnchor() | anchorManager.AddAnchor() | 创建锚点 |
| anchor.UpdatePose() | 自动处理 | 更新位置 |

## Common Issues and Solutions

### Anchor Tracking Issues
- 确保 ARAnchorManager 已启用
- 验证场景中有足够的特征点
- 检查锚点创建时的位姿是否正确

### Persistence Issues
- AR Foundation 不直接提供持久化功能
- 考虑使用 PlayerPrefs 或其他存储方案保存锚点数据
- 确保保存足够的环境特征数据用于重定位

## Additional Resources
- [AR Foundation Anchor Documentation](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@5.0/manual/features/anchors.html)

## Shared Anchors

AR Foundation 本身不直接提供多人共享锚点的功能，但可以通过以下方式实现：

### 1. 使用 Azure Spatial Anchors
推荐使用 Azure Spatial Anchors (ASA) 来实现跨设备的锚点共享：
- 提供云端存储和同步功能
- 支持跨平台和跨设备
- 高精度的空间对齐
- [了解更多关于 ASA](https://learn.microsoft.com/azure/spatial-anchors/overview)

### 2. 自定义实现
也可以自行实现锚点共享系统：

1. 保存锚点数据
```csharp
public class SharedAnchorData
{
    public string id;                    // 锚点唯一标识符
    public Vector3 position;             // 位置
    public Quaternion rotation;          // 旋转
    public byte[] environmentData;       // 环境特征数据
}
```

2. 同步锚点
```csharp
public class AnchorSharingManager : MonoBehaviour
{
    private ARAnchorManager m_AnchorManager;

    public async Task ShareAnchor(ARAnchor anchor)
    {
        var sharedData = new SharedAnchorData
        {
            id = anchor.trackableId.ToString(),
            position = anchor.transform.position,
            rotation = anchor.transform.rotation,
            // 获取环境特征数据
            environmentData = await GetEnvironmentData(anchor)
        };

        // 通过网络发送到其他设备
        await NetworkManager.ShareAnchorData(sharedData);
    }

    public async Task LoadSharedAnchor(SharedAnchorData sharedData)
    {
        // 使用环境特征数据重定位
        await RelocateUsingEnvironmentData(sharedData.environmentData);

        // 创建锚点
        var pose = new Pose(sharedData.position, sharedData.rotation);
        var anchor = m_AnchorManager.AddAnchor(pose);
    }
}
```

### 3. 注意事项
实现共享锚点时需要考虑：
- 环境特征数据的采集和存储
- 网络传输和同步机制
- 跨设备重定位的精度
- 锚点生命周期管理
- 用户权限和隐私

### 4. 最佳实践
- 使用成熟的云服务（如 ASA）而不是自行实现
- 确保采集足够的环境特征数据
- 实现错误处理和重试机制
- 考虑网络延迟和断连情况
- 提供用户反馈机制
