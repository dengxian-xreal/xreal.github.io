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
- NRSDK 使用 NRWorldAnchorStore 进行持久化，AR Foundation 5.0 需要通过 XREAL SDK 扩展实现持久化，6.0+ 版本原生支持持久化
- AR Foundation 提供更完整的锚点生命周期管理（添加、更新、移除）

### 4. Anchor Properties Migration

| NRSDK Property/Method | AR Foundation Equivalent | Description |
|----------------------|-------------------------|-------------|
| anchor.UUID | anchor.trackableId | 锚点唯一标识符 |
| anchor.CurrentTrackingState | anchor.trackingState | 追踪状态 |
| anchor.CreateAnchor() | anchorManager.AddAnchor() | 创建锚点 |
| anchor.UpdatePose() | 自动处理 | 更新位置 |

## Common Issues
- 确保 ARAnchorManager 已启用
- 验证场景中有足够的特征点
- 检查锚点创建时的位姿是否正确

## Anchor Persistence
### AR Foundation 5.0
- 不直接提供持久化功能
- XREAL SDK 提供扩展方法支持锚点的保存和加载

### AR Foundation 6.0+
原生支持锚点持久化，提供以下API：
- TryGetSavedAnchorIdsAsync：获取所有已保存的锚点ID
- TryLoadAnchorAsync：加载特定锚点
- TryEraseAnchorAsync：删除特定锚点

注意：确保保存足够的环境特征数据用于重定位

## Additional Resources
- [AR Foundation Anchor Documentation](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@5.1/manual/features/anchors.html)
- [AR Foundation 6.0 Persistent Anchors](https://docs.unity3d.com/Packages/com.unity.xr.arfoundation@6.1/manual/features/anchors/persistent-anchors.html)
