#/bin/sh

if [ "$#" -ne 1 ]; then
    echo "Deployment url is needed!"
    exit -1
fi

TARGET=$1
echo "Deploying to $TARGET"

ng build

echo "Creating tar file..."
tar cJpf website.tar.xz -C dist/website/ .

echo "Transferring tar to $TARGET..."
scp website.tar.xz $TARGET:

WORKDIR="$(ssh $TARGET pwd)"
echo "File is available at $TARGET:$WORKDIR/website.tar.xz"
