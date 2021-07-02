using Snapper.Exceptions;

namespace Snapper.Core
{
    internal class SnapshotAsserter
    {
        public void AssertSnapshot(SnapResult snapResult)
        {
            switch (snapResult.Status)
            {
                case SnapResultStatus.SnapshotDoesNotExist:
                    throw new SnapshotDoesNotExistException(snapResult);
                case SnapResultStatus.SnapshotsDoNotMatch:
                    throw new SnapshotsDoNotMatchException(snapResult);
                case SnapResultStatus.SnapshotUpdated:
                case SnapResultStatus.SnapshotsMatch:
                default:
                    return;
            }
        }
    }
}
